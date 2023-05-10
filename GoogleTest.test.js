const puppeteer = require("puppeteer");
const GoogleClass = require("./GoogleClass");

describe("Google search", () => {
    let browser;
    let page;
    const KEY_STRING = "ynet";
    const EXPECTED_URL = "https://www.ynet.co.il/home/0,7340,L-8,00.html";
    let googleClass;
    beforeAll(async () => {
        browser = await puppeteer.launch({
            headless: false,
            slowMo: 50,
        });
        page = await browser.newPage();
        googleClass = new GoogleClass(page);
    });

    afterAll(async () => {
        // await browser.close();
    });

    test("search for puppeteer on Google", async () => {
        await googleClass.navigateTo();
        await googleClass.enterTextToSearch(KEY_STRING);
        await googleClass.clickSearch();
        await googleClass.verifyResultsPageLoaded(KEY_STRING);
        await googleClass.verifyFirstResult(EXPECTED_URL);
        await googleClass.clickFirstResult();
        await googleClass.verifyPageTitle(KEY_STRING);
        await googleClass.backToGoogle();
        await googleClass.verifySearchValue(KEY_STRING);
    }, 20000);
});
