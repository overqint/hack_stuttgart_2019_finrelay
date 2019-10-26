import { Module, OnModuleInit } from '@nestjs/common';
import { N8NWrapperService } from './n8n-wrapper.service';
import { TEST_WORKFLOW_DATA } from './test-workflow-data.const';
import { InputPlaceholderRepository } from './input-placeholder.repository';

@Module({
  providers: [N8NWrapperService, InputPlaceholderRepository],
  exports: [N8NWrapperService, InputPlaceholderRepository],
})
export class N8NWrapperModule implements OnModuleInit {
  async onModuleInit() {
    const workflowData: any = TEST_WORKFLOW_DATA;
    try {
      const result = await this.n8nWrapperService.runWorkflow(workflowData);
      console.log(
        'n8nWrapperService result',
        JSON.stringify(result.data.resultData.runData.Function1, null, 2),
      );
    } catch (err) {
      const rethrownErr: Error | any = new Error('Error executing workflow.');
      rethrownErr.cause = err;
    }
  }
  constructor(private n8nWrapperService: N8NWrapperService) {}
}
