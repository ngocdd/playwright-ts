/**
@Author                : ngocdd<ngocdd94@gmail.com>
@CreatedDate           : 2023-07-10 21:59:00
@LastEditors           : ngocdd<ngocdd94@gmail.com>
@LastEditDate          : 2023-07-15 12:20:49
*/

export enum LOType {
  LO = 'LEARNING_MATERIAL_LEARNING_OBJECTIVE',
  FlashCard = 'LEARNING_MATERIAL_FLASH_CARD',
  Assignment = 'LEARNING_MATERIAL_GENERAL_ASSIGNMENT',
  Exam = 'LEARNING_MATERIAL_EXAM_LO',
  Task = 'LEARNING_MATERIAL_TASK_ASSIGNMENT',
}

export enum MoveDirection {
  Up = 'Up',
  Down = 'Down',
}

export enum QuestionTypes {
  MC = 'Multiple choice',
  FIB = 'Fill in the blank',
  MI = 'Manual input',
  MA = 'Multiple answer',
  OQ = 'Ordering',
}

export enum RanDomTypes {
  date = 'date',
  text = 'text',
  text_and__date = 'text_and_date',
}
