import {
    browser,
    by,
    protractor,
    ActionSequence,
    ElementFinder,
    ElementArrayFinder
} from "protractor";
import { inspect } from "util";

export class Page {
    constructor() {}

    navigateTo(destination) {
        return browser.get(destination);
    }

    getTitle() {
        return browser.getTitle();
    }

    getControlById(id: string): ElementFinder {
        return browser.element(by.id(id));
    }

    getControlsByParentClassAndChildType(classParent: string, typeChild: string): ElementArrayFinder {
        return browser.element.all(by.css(`.${classParent} ${typeChild}`));
    }

    getControlByCss(css: string): ElementFinder {
        return browser.element(by.css(css));
    }

    wait() {
        browser.waitForAngular();
    }

    sleep(miliseconds) {
        return browser.sleep(miliseconds);
    }

    getCurrentUrl() {
        return browser.getCurrentUrl();
    }

    saveValueInLocalStorage(keyName: string, keyValue: string){
        return browser.executeScript(()=>{
            window.localStorage.setItem(arguments[0][0],arguments[0][1]);
        },[keyName,keyValue]);
    }

    getValueFromLocalStorage(keyName: string){
        return browser.executeScript(()=>{
            return window.localStorage.getItem(arguments[0][0]);
        },[keyName]);
    }
}
