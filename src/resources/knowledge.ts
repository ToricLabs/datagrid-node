// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../resource';
import { isRequestOptions } from '../core';
import * as Core from '../core';

export class KnowledgeResource extends APIResource {
  create(body: KnowledgeCreateParams, options?: Core.RequestOptions): Core.APIPromise<Knowledge> {
    return this._client.post('/v1/knowledge', Core.multipartFormRequestOptions({ body, ...options }));
  }

  list(query?: KnowledgeListParams, options?: Core.RequestOptions): Core.APIPromise<KnowledgeListResponse>;
  list(options?: Core.RequestOptions): Core.APIPromise<KnowledgeListResponse>;
  list(
    query: KnowledgeListParams | Core.RequestOptions = {},
    options?: Core.RequestOptions,
  ): Core.APIPromise<KnowledgeListResponse> {
    if (isRequestOptions(query)) {
      return this.list({}, query);
    }
    return this._client.get('/v1/knowledge', { query, ...options });
  }
}

export interface Knowledge {
  id: string;

  created_at: string;

  name: string;

  object: 'knowledge';

  status: 'pending' | 'partial' | 'ready' | 'failed';
}

export interface KnowledgeListResponse {
  data: Array<Knowledge>;

  next: string;

  object: 'list';
}

export interface KnowledgeCreateParams {
  files: Array<Core.Uploadable>;

  name?: string;
}

export interface KnowledgeListParams {
  direction?: 'asc' | 'desc';

  limit?: number;

  next?: string;

  sort?: 'created_at';
}

export declare namespace KnowledgeResource {
  export {
    type Knowledge as Knowledge,
    type KnowledgeListResponse as KnowledgeListResponse,
    type KnowledgeCreateParams as KnowledgeCreateParams,
    type KnowledgeListParams as KnowledgeListParams,
  };
}
