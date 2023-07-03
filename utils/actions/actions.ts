/******************************************************************************
 * @Author                : ngocdd<ngocdd94@gmail.com>                        *
 * @CreatedDate           : 2023-07-03 17:31:21                               *
 * @LastEditors           : ngocdd<ngocdd94@gmail.com>                        *
 * @LastEditDate          : 2023-07-03 17:35:03                               *
 *****************************************************************************/

import { Page } from "@playwright/test"



export class Actions{
  readonly page:Page;
  
  constructor(page: Page){
    this.page = page;  
  }


  async function name(params: string) {
    
  }

}