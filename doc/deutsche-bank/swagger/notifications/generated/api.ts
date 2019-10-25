// tslint:disable
/// <reference path="./custom.d.ts" />
/**
 * dbapi-subscriptions
 * dbAPI subscription service. Provides an API to manage subscriptions of certains events like transaction creation.
 *
 * The version of the OpenAPI document: v1
 * Contact: bank.api@db.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as globalImportUrl from "url";
import { Configuration } from "./configuration";
import globalAxios, { AxiosPromise, AxiosInstance } from "axios";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError
} from "./base";

/**
 *
 * @export
 * @interface ActivationDTO
 */
export interface ActivationDTO {
  /**
   *
   * @type {string}
   * @memberof ActivationDTO
   */
  activationCode?: string;
}
/**
 * Default error response message
 * @export
 * @interface ErrorResponse
 */
export interface ErrorResponse {
  /**
   * The error code
   * @type {string}
   * @memberof ErrorResponse
   */
  code: string;
  /**
   * Description of the belonging error code.
   * @type {string}
   * @memberof ErrorResponse
   */
  message: string;
}
/**
 *
 * @export
 * @interface PagedResultSubscription
 */
export interface PagedResultSubscription {
  /**
   *
   * @type {Array<Subscription>}
   * @memberof PagedResultSubscription
   */
  items: Array<Subscription>;
  /**
   * Total number of items found for your request parameters over all pages of the pagination.
   * @type {number}
   * @memberof PagedResultSubscription
   */
  totalItems: number;
}
/**
 *
 * @export
 * @interface Subscription
 */
export interface Subscription {
  /**
   *
   * @type {SubscriptionFilterCriteria}
   * @memberof Subscription
   */
  filterCriteria?: SubscriptionFilterCriteria;
  /**
   * ID of the resource
   * @type {string}
   * @memberof Subscription
   */
  id?: string;
  /**
   *
   * @type {SubscriptionDetails}
   * @memberof Subscription
   */
  subscriptionDetails?: SubscriptionDetails;
}
/**
 * Subscription details
 * @export
 * @interface SubscriptionDetails
 */
export interface SubscriptionDetails {
  /**
   * The date, when a subscription expires. Format: YYYY-MM-DD
   * @type {string}
   * @memberof SubscriptionDetails
   */
  expirationDate?: string;
  /**
   *
   * @type {boolean}
   * @memberof SubscriptionDetails
   */
  isActive?: boolean;
  /**
   * The URL the notification will be passed towards.
   * @type {string}
   * @memberof SubscriptionDetails
   */
  notificationURL: string;
  /**
   * Type of subscription
   * @type {string}
   * @memberof SubscriptionDetails
   */
  subscriptionType: SubscriptionDetailsSubscriptionTypeEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum SubscriptionDetailsSubscriptionTypeEnum {
  OneTime = "one-time",
  Recurring = "recurring"
}

/**
 * Filter criteria
 * @export
 * @interface SubscriptionFilterCriteria
 */
export interface SubscriptionFilterCriteria {
  /**
   * IBAN of the account to subscribe to.
   * @type {string}
   * @memberof SubscriptionFilterCriteria
   */
  iban: string;
  /**
   * true, if events shall be filtered for incoming transactions, false if not.
   * @type {boolean}
   * @memberof SubscriptionFilterCriteria
   */
  incoming?: boolean;
  /**
   * events will be filtered for a transactions amount, absolute values only.
   * @type {number}
   * @memberof SubscriptionFilterCriteria
   */
  maxAmount?: number;
  /**
   * events will be filtered for a transaction amount, absolute values only.
   * @type {number}
   * @memberof SubscriptionFilterCriteria
   */
  minAmount?: number;
  /**
   * true, if events shall be filtered for outgoing transactions, false if not.
   * @type {boolean}
   * @memberof SubscriptionFilterCriteria
   */
  outgoing?: boolean;
}
/**
 *
 * @export
 * @interface SubscriptionPatch
 */
export interface SubscriptionPatch {
  /**
   *
   * @type {SubscriptionPatchSubscriptionDetails}
   * @memberof SubscriptionPatch
   */
  subscriptionDetails: SubscriptionPatchSubscriptionDetails;
}
/**
 * Subscription details
 * @export
 * @interface SubscriptionPatchSubscriptionDetails
 */
export interface SubscriptionPatchSubscriptionDetails {
  /**
   * The date, when a subscription expires. Format: YYYY-MM-DD
   * @type {string}
   * @memberof SubscriptionPatchSubscriptionDetails
   */
  expirationDate: string;
}
/**
 *
 * @export
 * @interface SubscriptionPost
 */
export interface SubscriptionPost {
  /**
   *
   * @type {SubscriptionFilterCriteria}
   * @memberof SubscriptionPost
   */
  filterCriteria?: SubscriptionFilterCriteria;
  /**
   *
   * @type {SubscriptionPostDetails}
   * @memberof SubscriptionPost
   */
  subscriptionDetails?: SubscriptionPostDetails;
}
/**
 * Subscription details
 * @export
 * @interface SubscriptionPostDetails
 */
export interface SubscriptionPostDetails {
  /**
   * The date, when a subscription expires. Format: YYYY-MM-DD
   * @type {string}
   * @memberof SubscriptionPostDetails
   */
  expirationDate?: string;
  /**
   * The URL the notification will be passed towards.
   * @type {string}
   * @memberof SubscriptionPostDetails
   */
  notificationURL: string;
  /**
   * Type of subscription?
   * @type {string}
   * @memberof SubscriptionPostDetails
   */
  subscriptionType: SubscriptionPostDetailsSubscriptionTypeEnum;
}

/**
 * @export
 * @enum {string}
 */
export enum SubscriptionPostDetailsSubscriptionTypeEnum {
  OneTime = "one-time",
  Recurring = "recurring"
}

/**
 * SubscriptionApi - axios parameter creator
 * @export
 */
export const SubscriptionApiAxiosParamCreator = function(
  configuration?: Configuration
) {
  return {
    /**
     * Activate subscription notification url
     * @summary Activate subscription
     * @param {string} subscriptionId subscriptionId
     * @param {ActivationDTO} activation activation
     * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    subscriptionActivation(
      subscriptionId: string,
      activation: ActivationDTO,
      correlationId?: string,
      options: any = {}
    ): RequestArgs {
      // verify required parameter 'subscriptionId' is not null or undefined
      if (subscriptionId === null || subscriptionId === undefined) {
        throw new RequiredError(
          "subscriptionId",
          "Required parameter subscriptionId was null or undefined when calling subscriptionActivation."
        );
      }
      // verify required parameter 'activation' is not null or undefined
      if (activation === null || activation === undefined) {
        throw new RequiredError(
          "activation",
          "Required parameter activation was null or undefined when calling subscriptionActivation."
        );
      }
      const localVarPath = `/{subscriptionId}`.replace(
        `{${"subscriptionId"}}`,
        encodeURIComponent(String(subscriptionId))
      );
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "PATCH",
        ...baseOptions,
        ...options
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api_auth_code required
      // oauth required
      if (configuration && configuration.accessToken) {
        const localVarAccessTokenValue =
          typeof configuration.accessToken === "function"
            ? configuration.accessToken("api_auth_code", [
                "transaction_notifications"
              ])
            : configuration.accessToken;
        localVarHeaderParameter["Authorization"] =
          "Bearer " + localVarAccessTokenValue;
      }

      // authentication api_implicit required
      // oauth required
      if (configuration && configuration.accessToken) {
        const localVarAccessTokenValue =
          typeof configuration.accessToken === "function"
            ? configuration.accessToken("api_implicit", [
                "transaction_notifications"
              ])
            : configuration.accessToken;
        localVarHeaderParameter["Authorization"] =
          "Bearer " + localVarAccessTokenValue;
      }

      if (correlationId !== undefined && correlationId !== null) {
        localVarHeaderParameter["Correlation-Id"] = String(correlationId);
      }

      localVarHeaderParameter["Content-Type"] = "application/json";

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...options.headers
      };
      const needsSerialization =
        <any>"ActivationDTO" !== "string" ||
        localVarRequestOptions.headers["Content-Type"] === "application/json";
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(activation !== undefined ? activation : {})
        : activation || "";

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Get all transaction subcriptions for the current user
     * @summary Get all transaction subcriptions
     * @param {string} [iban] IBAN representing an account of the current user.
     * @param {number} [limit] limit defines count of resources per request/page.
     * @param {number} [offset] pagination depending on the query parameter limit. Defines current page offset, starting with 0, default 0
     * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    transactionsGet(
      iban?: string,
      limit?: number,
      offset?: number,
      correlationId?: string,
      options: any = {}
    ): RequestArgs {
      const localVarPath = `/transactions`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api_auth_code required
      // oauth required
      if (configuration && configuration.accessToken) {
        const localVarAccessTokenValue =
          typeof configuration.accessToken === "function"
            ? configuration.accessToken("api_auth_code", [
                "transaction_notifications"
              ])
            : configuration.accessToken;
        localVarHeaderParameter["Authorization"] =
          "Bearer " + localVarAccessTokenValue;
      }

      // authentication api_implicit required
      // oauth required
      if (configuration && configuration.accessToken) {
        const localVarAccessTokenValue =
          typeof configuration.accessToken === "function"
            ? configuration.accessToken("api_implicit", [
                "transaction_notifications"
              ])
            : configuration.accessToken;
        localVarHeaderParameter["Authorization"] =
          "Bearer " + localVarAccessTokenValue;
      }

      if (iban !== undefined) {
        localVarQueryParameter["iban"] = iban;
      }

      if (limit !== undefined) {
        localVarQueryParameter["limit"] = limit;
      }

      if (offset !== undefined) {
        localVarQueryParameter["offset"] = offset;
      }

      if (correlationId !== undefined && correlationId !== null) {
        localVarHeaderParameter["Correlation-Id"] = String(correlationId);
      }

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...options.headers
      };

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Creates a subscription for transaction events.
     * @summary Creates a transaction event subcription
     * @param {string} idempotencyID Unique identifier that the caller provides to establish idempotency for this request.
     * @param {SubscriptionPost} createSubscription Input parameters to create a subscription
     * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    transactionsPost(
      idempotencyID: string,
      createSubscription: SubscriptionPost,
      correlationId?: string,
      options: any = {}
    ): RequestArgs {
      // verify required parameter 'idempotencyID' is not null or undefined
      if (idempotencyID === null || idempotencyID === undefined) {
        throw new RequiredError(
          "idempotencyID",
          "Required parameter idempotencyID was null or undefined when calling transactionsPost."
        );
      }
      // verify required parameter 'createSubscription' is not null or undefined
      if (createSubscription === null || createSubscription === undefined) {
        throw new RequiredError(
          "createSubscription",
          "Required parameter createSubscription was null or undefined when calling transactionsPost."
        );
      }
      const localVarPath = `/transactions`;
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api_auth_code required
      // oauth required
      if (configuration && configuration.accessToken) {
        const localVarAccessTokenValue =
          typeof configuration.accessToken === "function"
            ? configuration.accessToken("api_auth_code", [
                "transaction_notifications"
              ])
            : configuration.accessToken;
        localVarHeaderParameter["Authorization"] =
          "Bearer " + localVarAccessTokenValue;
      }

      // authentication api_implicit required
      // oauth required
      if (configuration && configuration.accessToken) {
        const localVarAccessTokenValue =
          typeof configuration.accessToken === "function"
            ? configuration.accessToken("api_implicit", [
                "transaction_notifications"
              ])
            : configuration.accessToken;
        localVarHeaderParameter["Authorization"] =
          "Bearer " + localVarAccessTokenValue;
      }

      if (idempotencyID !== undefined && idempotencyID !== null) {
        localVarHeaderParameter["Idempotency-ID"] = String(idempotencyID);
      }

      if (correlationId !== undefined && correlationId !== null) {
        localVarHeaderParameter["Correlation-Id"] = String(correlationId);
      }

      localVarHeaderParameter["Content-Type"] = "application/json";

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...options.headers
      };
      const needsSerialization =
        <any>"SubscriptionPost" !== "string" ||
        localVarRequestOptions.headers["Content-Type"] === "application/json";
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(
            createSubscription !== undefined ? createSubscription : {}
          )
        : createSubscription || "";

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Deletes a transaction subcription
     * @summary Deletes a transaction subcription
     * @param {string} subscriptionId ID of the resource
     * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    transactionsSubscriptionIdDelete(
      subscriptionId: string,
      correlationId?: string,
      options: any = {}
    ): RequestArgs {
      // verify required parameter 'subscriptionId' is not null or undefined
      if (subscriptionId === null || subscriptionId === undefined) {
        throw new RequiredError(
          "subscriptionId",
          "Required parameter subscriptionId was null or undefined when calling transactionsSubscriptionIdDelete."
        );
      }
      const localVarPath = `/transactions/{subscriptionId}`.replace(
        `{${"subscriptionId"}}`,
        encodeURIComponent(String(subscriptionId))
      );
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "DELETE",
        ...baseOptions,
        ...options
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api_auth_code required
      // oauth required
      if (configuration && configuration.accessToken) {
        const localVarAccessTokenValue =
          typeof configuration.accessToken === "function"
            ? configuration.accessToken("api_auth_code", [
                "transaction_notifications"
              ])
            : configuration.accessToken;
        localVarHeaderParameter["Authorization"] =
          "Bearer " + localVarAccessTokenValue;
      }

      // authentication api_implicit required
      // oauth required
      if (configuration && configuration.accessToken) {
        const localVarAccessTokenValue =
          typeof configuration.accessToken === "function"
            ? configuration.accessToken("api_implicit", [
                "transaction_notifications"
              ])
            : configuration.accessToken;
        localVarHeaderParameter["Authorization"] =
          "Bearer " + localVarAccessTokenValue;
      }

      if (correlationId !== undefined && correlationId !== null) {
        localVarHeaderParameter["Correlation-Id"] = String(correlationId);
      }

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...options.headers
      };

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions
      };
    },
    /**
     * Updates a transaction subcription
     * @summary Updates a transaction subcription
     * @param {string} subscriptionId ID of the resource
     * @param {SubscriptionPatch} subscriptionBody Input parameters to create a subscription
     * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    transactionsSubscriptionIdPatch(
      subscriptionId: string,
      subscriptionBody: SubscriptionPatch,
      correlationId?: string,
      options: any = {}
    ): RequestArgs {
      // verify required parameter 'subscriptionId' is not null or undefined
      if (subscriptionId === null || subscriptionId === undefined) {
        throw new RequiredError(
          "subscriptionId",
          "Required parameter subscriptionId was null or undefined when calling transactionsSubscriptionIdPatch."
        );
      }
      // verify required parameter 'subscriptionBody' is not null or undefined
      if (subscriptionBody === null || subscriptionBody === undefined) {
        throw new RequiredError(
          "subscriptionBody",
          "Required parameter subscriptionBody was null or undefined when calling transactionsSubscriptionIdPatch."
        );
      }
      const localVarPath = `/transactions/{subscriptionId}`.replace(
        `{${"subscriptionId"}}`,
        encodeURIComponent(String(subscriptionId))
      );
      const localVarUrlObj = globalImportUrl.parse(localVarPath, true);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }
      const localVarRequestOptions = {
        method: "PATCH",
        ...baseOptions,
        ...options
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      // authentication api_auth_code required
      // oauth required
      if (configuration && configuration.accessToken) {
        const localVarAccessTokenValue =
          typeof configuration.accessToken === "function"
            ? configuration.accessToken("api_auth_code", [
                "transaction_notifications"
              ])
            : configuration.accessToken;
        localVarHeaderParameter["Authorization"] =
          "Bearer " + localVarAccessTokenValue;
      }

      // authentication api_implicit required
      // oauth required
      if (configuration && configuration.accessToken) {
        const localVarAccessTokenValue =
          typeof configuration.accessToken === "function"
            ? configuration.accessToken("api_implicit", [
                "transaction_notifications"
              ])
            : configuration.accessToken;
        localVarHeaderParameter["Authorization"] =
          "Bearer " + localVarAccessTokenValue;
      }

      if (correlationId !== undefined && correlationId !== null) {
        localVarHeaderParameter["Correlation-Id"] = String(correlationId);
      }

      localVarHeaderParameter["Content-Type"] = "application/json";

      localVarUrlObj.query = {
        ...localVarUrlObj.query,
        ...localVarQueryParameter,
        ...options.query
      };
      // fix override query string Detail: https://stackoverflow.com/a/7517673/1077943
      delete localVarUrlObj.search;
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...options.headers
      };
      const needsSerialization =
        <any>"SubscriptionPatch" !== "string" ||
        localVarRequestOptions.headers["Content-Type"] === "application/json";
      localVarRequestOptions.data = needsSerialization
        ? JSON.stringify(subscriptionBody !== undefined ? subscriptionBody : {})
        : subscriptionBody || "";

      return {
        url: globalImportUrl.format(localVarUrlObj),
        options: localVarRequestOptions
      };
    }
  };
};

/**
 * SubscriptionApi - functional programming interface
 * @export
 */
export const SubscriptionApiFp = function(configuration?: Configuration) {
  return {
    /**
     * Activate subscription notification url
     * @summary Activate subscription
     * @param {string} subscriptionId subscriptionId
     * @param {ActivationDTO} activation activation
     * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    subscriptionActivation(
      subscriptionId: string,
      activation: ActivationDTO,
      correlationId?: string,
      options?: any
    ): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<object> {
      const localVarAxiosArgs = SubscriptionApiAxiosParamCreator(
        configuration
      ).subscriptionActivation(
        subscriptionId,
        activation,
        correlationId,
        options
      );
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * Get all transaction subcriptions for the current user
     * @summary Get all transaction subcriptions
     * @param {string} [iban] IBAN representing an account of the current user.
     * @param {number} [limit] limit defines count of resources per request/page.
     * @param {number} [offset] pagination depending on the query parameter limit. Defines current page offset, starting with 0, default 0
     * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    transactionsGet(
      iban?: string,
      limit?: number,
      offset?: number,
      correlationId?: string,
      options?: any
    ): (
      axios?: AxiosInstance,
      basePath?: string
    ) => AxiosPromise<PagedResultSubscription> {
      const localVarAxiosArgs = SubscriptionApiAxiosParamCreator(
        configuration
      ).transactionsGet(iban, limit, offset, correlationId, options);
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * Creates a subscription for transaction events.
     * @summary Creates a transaction event subcription
     * @param {string} idempotencyID Unique identifier that the caller provides to establish idempotency for this request.
     * @param {SubscriptionPost} createSubscription Input parameters to create a subscription
     * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    transactionsPost(
      idempotencyID: string,
      createSubscription: SubscriptionPost,
      correlationId?: string,
      options?: any
    ): (
      axios?: AxiosInstance,
      basePath?: string
    ) => AxiosPromise<Subscription> {
      const localVarAxiosArgs = SubscriptionApiAxiosParamCreator(
        configuration
      ).transactionsPost(
        idempotencyID,
        createSubscription,
        correlationId,
        options
      );
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * Deletes a transaction subcription
     * @summary Deletes a transaction subcription
     * @param {string} subscriptionId ID of the resource
     * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    transactionsSubscriptionIdDelete(
      subscriptionId: string,
      correlationId?: string,
      options?: any
    ): (axios?: AxiosInstance, basePath?: string) => AxiosPromise<object> {
      const localVarAxiosArgs = SubscriptionApiAxiosParamCreator(
        configuration
      ).transactionsSubscriptionIdDelete(
        subscriptionId,
        correlationId,
        options
      );
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        };
        return axios.request(axiosRequestArgs);
      };
    },
    /**
     * Updates a transaction subcription
     * @summary Updates a transaction subcription
     * @param {string} subscriptionId ID of the resource
     * @param {SubscriptionPatch} subscriptionBody Input parameters to create a subscription
     * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    transactionsSubscriptionIdPatch(
      subscriptionId: string,
      subscriptionBody: SubscriptionPatch,
      correlationId?: string,
      options?: any
    ): (
      axios?: AxiosInstance,
      basePath?: string
    ) => AxiosPromise<Subscription> {
      const localVarAxiosArgs = SubscriptionApiAxiosParamCreator(
        configuration
      ).transactionsSubscriptionIdPatch(
        subscriptionId,
        subscriptionBody,
        correlationId,
        options
      );
      return (
        axios: AxiosInstance = globalAxios,
        basePath: string = BASE_PATH
      ) => {
        const axiosRequestArgs = {
          ...localVarAxiosArgs.options,
          url: basePath + localVarAxiosArgs.url
        };
        return axios.request(axiosRequestArgs);
      };
    }
  };
};

/**
 * SubscriptionApi - factory interface
 * @export
 */
export const SubscriptionApiFactory = function(
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  return {
    /**
     * Activate subscription notification url
     * @summary Activate subscription
     * @param {string} subscriptionId subscriptionId
     * @param {ActivationDTO} activation activation
     * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    subscriptionActivation(
      subscriptionId: string,
      activation: ActivationDTO,
      correlationId?: string,
      options?: any
    ) {
      return SubscriptionApiFp(configuration).subscriptionActivation(
        subscriptionId,
        activation,
        correlationId,
        options
      )(axios, basePath);
    },
    /**
     * Get all transaction subcriptions for the current user
     * @summary Get all transaction subcriptions
     * @param {string} [iban] IBAN representing an account of the current user.
     * @param {number} [limit] limit defines count of resources per request/page.
     * @param {number} [offset] pagination depending on the query parameter limit. Defines current page offset, starting with 0, default 0
     * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    transactionsGet(
      iban?: string,
      limit?: number,
      offset?: number,
      correlationId?: string,
      options?: any
    ) {
      return SubscriptionApiFp(configuration).transactionsGet(
        iban,
        limit,
        offset,
        correlationId,
        options
      )(axios, basePath);
    },
    /**
     * Creates a subscription for transaction events.
     * @summary Creates a transaction event subcription
     * @param {string} idempotencyID Unique identifier that the caller provides to establish idempotency for this request.
     * @param {SubscriptionPost} createSubscription Input parameters to create a subscription
     * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    transactionsPost(
      idempotencyID: string,
      createSubscription: SubscriptionPost,
      correlationId?: string,
      options?: any
    ) {
      return SubscriptionApiFp(configuration).transactionsPost(
        idempotencyID,
        createSubscription,
        correlationId,
        options
      )(axios, basePath);
    },
    /**
     * Deletes a transaction subcription
     * @summary Deletes a transaction subcription
     * @param {string} subscriptionId ID of the resource
     * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    transactionsSubscriptionIdDelete(
      subscriptionId: string,
      correlationId?: string,
      options?: any
    ) {
      return SubscriptionApiFp(configuration).transactionsSubscriptionIdDelete(
        subscriptionId,
        correlationId,
        options
      )(axios, basePath);
    },
    /**
     * Updates a transaction subcription
     * @summary Updates a transaction subcription
     * @param {string} subscriptionId ID of the resource
     * @param {SubscriptionPatch} subscriptionBody Input parameters to create a subscription
     * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    transactionsSubscriptionIdPatch(
      subscriptionId: string,
      subscriptionBody: SubscriptionPatch,
      correlationId?: string,
      options?: any
    ) {
      return SubscriptionApiFp(configuration).transactionsSubscriptionIdPatch(
        subscriptionId,
        subscriptionBody,
        correlationId,
        options
      )(axios, basePath);
    }
  };
};

/**
 * SubscriptionApi - object-oriented interface
 * @export
 * @class SubscriptionApi
 * @extends {BaseAPI}
 */
export class SubscriptionApi extends BaseAPI {
  /**
   * Activate subscription notification url
   * @summary Activate subscription
   * @param {string} subscriptionId subscriptionId
   * @param {ActivationDTO} activation activation
   * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionApi
   */
  public subscriptionActivation(
    subscriptionId: string,
    activation: ActivationDTO,
    correlationId?: string,
    options?: any
  ) {
    return SubscriptionApiFp(this.configuration).subscriptionActivation(
      subscriptionId,
      activation,
      correlationId,
      options
    )(this.axios, this.basePath);
  }

  /**
   * Get all transaction subcriptions for the current user
   * @summary Get all transaction subcriptions
   * @param {string} [iban] IBAN representing an account of the current user.
   * @param {number} [limit] limit defines count of resources per request/page.
   * @param {number} [offset] pagination depending on the query parameter limit. Defines current page offset, starting with 0, default 0
   * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionApi
   */
  public transactionsGet(
    iban?: string,
    limit?: number,
    offset?: number,
    correlationId?: string,
    options?: any
  ) {
    return SubscriptionApiFp(this.configuration).transactionsGet(
      iban,
      limit,
      offset,
      correlationId,
      options
    )(this.axios, this.basePath);
  }

  /**
   * Creates a subscription for transaction events.
   * @summary Creates a transaction event subcription
   * @param {string} idempotencyID Unique identifier that the caller provides to establish idempotency for this request.
   * @param {SubscriptionPost} createSubscription Input parameters to create a subscription
   * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionApi
   */
  public transactionsPost(
    idempotencyID: string,
    createSubscription: SubscriptionPost,
    correlationId?: string,
    options?: any
  ) {
    return SubscriptionApiFp(this.configuration).transactionsPost(
      idempotencyID,
      createSubscription,
      correlationId,
      options
    )(this.axios, this.basePath);
  }

  /**
   * Deletes a transaction subcription
   * @summary Deletes a transaction subcription
   * @param {string} subscriptionId ID of the resource
   * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionApi
   */
  public transactionsSubscriptionIdDelete(
    subscriptionId: string,
    correlationId?: string,
    options?: any
  ) {
    return SubscriptionApiFp(
      this.configuration
    ).transactionsSubscriptionIdDelete(subscriptionId, correlationId, options)(
      this.axios,
      this.basePath
    );
  }

  /**
   * Updates a transaction subcription
   * @summary Updates a transaction subcription
   * @param {string} subscriptionId ID of the resource
   * @param {SubscriptionPatch} subscriptionBody Input parameters to create a subscription
   * @param {string} [correlationId] Free form key controlled by the caller e.g. uuid
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof SubscriptionApi
   */
  public transactionsSubscriptionIdPatch(
    subscriptionId: string,
    subscriptionBody: SubscriptionPatch,
    correlationId?: string,
    options?: any
  ) {
    return SubscriptionApiFp(
      this.configuration
    ).transactionsSubscriptionIdPatch(
      subscriptionId,
      subscriptionBody,
      correlationId,
      options
    )(this.axios, this.basePath);
  }
}
