/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 23:10:48
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-10 23:10:48
*/

import { Reporter, TestCase, TestError, TestResult, TestStep } from '@playwright/test/reporter';
import Logger from './logger';

const TEST_SEPARATOR = '##############################################################################';
const STEP_SEPARATOR = '------------------------------------------------------------------------------';

export default class TestListener implements Reporter {
  onTestBegin(test: TestCase, result: TestResult): void {
    this.printLogs(`Test: ${test.title} - Started`, TEST_SEPARATOR);
  }

  onTestEnd(test: TestCase, result: TestResult): void {
    if (result.status === 'failed') {
      Logger.error(`Test: ${test.title} - ${result.status}\n${result.errors}`);
    }
    this.printLogs(`Test: ${test.title} - ${result.status}`, TEST_SEPARATOR);
  }

  onStdOut(chunk: string | Buffer, test?: TestCase, result?: TestResult): void {
    Logger.info(chunk);
  }

  onStdErr(chunk: string | Buffer, test?: TestCase, result?: TestResult): void {
    Logger.error(chunk);
  }

  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === 'test.step') {
      if (typeof step.parent !== 'undefined') {
        Logger.info(step.title);
      } else {
        this.printLogs(`Started Step: ${step.title}`, STEP_SEPARATOR);
      }
    }
  }

  onStepEnd(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === 'test.step' && typeof step.parent === 'undefined') {
      this.printLogs(`Completed Step: ${step.title}`, STEP_SEPARATOR);
    }
  }

  onError(error: TestError): void {
    Logger.error(`Message: ${error.message}`);
    Logger.error(`Stack: ${error.stack}`);
    Logger.error(`Value: ${error.value}`);
  }

  private printLogs(msg: string, separator: string) {
    Logger.info(separator);
    Logger.info(`${msg.toUpperCase()}`);
    Logger.info(separator);
  }
}
