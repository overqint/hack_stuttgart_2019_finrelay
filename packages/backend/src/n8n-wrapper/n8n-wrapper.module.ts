import { Module, OnModuleInit } from '@nestjs/common';
import { N8NWrapperService } from './n8n-wrapper.service';

@Module({
  providers: [N8NWrapperService],
})
export class N8NWrapperModule implements OnModuleInit {
  async onModuleInit() {
    const workflowData: any = require('./workflow-data.json');
    try {
    const result = await this.n8nWrapperService.runWorkflow(workflowData);
    console.log(
      'n8nWrapperService result',
      JSON.stringify(result.data.resultData.runData.Function1, null, 2),
    );
    } catch(err) {
      const rethrownErr: Error | any = new Error('Error executing workflow.');
      rethrownErr.cause = err;
    }
  }
  constructor(private n8nWrapperService: N8NWrapperService) {}
}
