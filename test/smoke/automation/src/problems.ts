// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for details.

import { Code } from "./code";

export const enum ProblemSeverity {
    WARNING = 0,
    ERROR = 1,
}

export class Problems {

    public static PROBLEMS_VIEW_SELECTOR = ".panel .markers-panel";

    constructor(private code: Code) { }

    public async showProblemsView(): Promise<any> {
        await this.toggleProblemsView();
        await this.waitForProblemsView();
    }

    public async hideProblemsView(): Promise<any> {
        await this.toggleProblemsView();
        await this.code.waitForElement(Problems.PROBLEMS_VIEW_SELECTOR, el => !el);
    }

    public async waitForProblemsView(): Promise<void> {
        await this.code.waitForElement(Problems.PROBLEMS_VIEW_SELECTOR);
    }

    public static getSelectorInProblemsView(problemType: ProblemSeverity): string {
        let selector = problemType === ProblemSeverity.WARNING ? "codicon-warning" : "codicon-error";
        return `div[id="workbench.panel.markers"] .monaco-tl-contents .marker-icon.${selector}`;
    }

    public static getSelectorInEditor(problemType: ProblemSeverity): string {
        let selector = problemType === ProblemSeverity.WARNING ? "squiggly-warning" : "squiggly-error";
        return `.view-overlays .cdr.${selector}`;
    }

    private async toggleProblemsView(): Promise<void> {
        if (process.platform === "darwin") {
            await this.code.dispatchKeybinding("cmd+shift+m");
        } else {
            await this.code.dispatchKeybinding("ctrl+shift+m");
        }
    }
}
