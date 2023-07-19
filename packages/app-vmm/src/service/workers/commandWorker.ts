import { Job } from 'bullmq';
import { config } from '../../config.js';
import { TakaroWorker, ICommandJobData } from '@takaro/queues';
import { ctx } from '@takaro/util';
import { executeFunction } from './executeFunction.js';

export class CommandWorker extends TakaroWorker<ICommandJobData> {
  constructor(concurrency: number) {
    super(config.get('queues.commands.name'), concurrency, processCommand);
  }
}

async function processCommand(job: Job<ICommandJobData>) {
  ctx.addData({
    domain: job.data.domainId,
    gameServer: job.data.gameServerId,
    jobId: job.id,
  });

  await executeFunction(job.data.functionId, job.data, job.data.domainId);
}
