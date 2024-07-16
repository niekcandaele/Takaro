import { ctx } from '@takaro/util';
import { config } from '../config.js';
import { DomainScoped } from './DomainScoped.js';
import { PostHog as PosthogInternal } from 'posthog-node';
import { EventTypes } from '../service/EventService.js';

interface IPosthogProperties {
  gameserver: string;
  module: string;
  player: string;
  user: string;
}

const blockedEvents: EventTypes[] = ['entity-killed', 'chat-message'];

const client = new PosthogInternal(config.get('posthog.apiKey'), { host: config.get('posthog.host') });

export class PostHog extends DomainScoped {
  constructor(domainId: string) {
    super(domainId);
  }

  async trackEvent(eventName: EventTypes, properties: IPosthogProperties) {
    if (!config.get('posthog.enabled')) return;
    if (blockedEvents.includes(eventName)) return;
    const distinctId = ctx.data.user || properties.user || properties.player || 'anonymous';

    client.capture({
      distinctId,
      event: eventName,
      properties: {
        domain: this.domainId,
        ...properties,
      },
    });
  }
}
