import 'geckodriver';
import { Builder, WebDriver } from 'selenium-webdriver';
import cheerio from 'cheerio';
import { CheerioRoot } from '../models';

let driver: WebDriver;

export const initBrowser = async () => {
  driver = await new Builder().forBrowser('chrome').build();
};

export const getPage = async (url: string): Promise<CheerioRoot> => {
  await driver.get(url);
  return cheerio.load(await driver.getPageSource());
};

export const reload = async (): Promise<void> => {
  await driver.navigate().refresh();
};
