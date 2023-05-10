const puppeteer = require("puppeteer");

class GoogleClass {
    firstResultSelector = "#search a";
    searchBarSelector = "#APjFqb";
    constructor(page) {
        this.page = page;
    }

    async navigateTo() {
        await this.page.goto("https://www.google.com");
    }
    async enterTextToSearch(searchKeyWord) {
        await this.page.type(this.searchBarSelector, searchKeyWord);
    }
    async clickSearch() {
        await this.page.keyboard.press("Enter");
    }

    async verifyResultsPageLoaded(searchKeyWord) {
        await this.page.waitForNavigation();
        const title = await this.page.title();
        expect(title.toLowerCase()).toContain(searchKeyWord);
    }
    async verifyFirstResult(EXPECTED_URL) {
        await this.page.waitForSelector(this.firstResultSelector);
        const firstResultTitle = await this.page.$eval(
            this.firstResultSelector,
            (el) => el.textContent.trim()
        );

        const firstResultUrl = await this.page.$eval(
            this.firstResultSelector,
            (el) => el.href
        );

        expect(firstResultUrl).toEqual(EXPECTED_URL);
    }

    async clickFirstResult() {
        await this.page.waitForSelector(this.firstResultSelector);
        const link = await this.page.$(this.firstResultSelector);
        await link.click();
    }
    async verifyPageTitle(searchKeyWord) {
        await this.page.waitForSelector("h1");
        const title = await this.page.title();
        expect(title.toLowerCase()).toContain(searchKeyWord);
    }
    async backToGoogle() {
        await this.page.goBack();
    }
    async verifySearchValue(KEY_STRING) {
        await this.page.waitForSelector(this.searchBarSelector);
        const searchBarValue = await this.page.$eval(
            this.searchBarSelector,
            (input) => input.value
        );
        expect(searchBarValue).toBe(KEY_STRING);
    }
}

module.exports = GoogleClass;
