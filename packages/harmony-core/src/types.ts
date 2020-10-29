/**
 * @packageDocumentation
 * @module harmony-core
 * @hidden
 */

import { HttpProvider, Messenger } from '@harmony-js-time/network';
import { TransactionFactory, Transaction } from '@harmony-js-time/transaction';
import { Wallet, Account } from '@harmony-js-time/account';
import { ChainType, ChainID } from '@harmony-js-time/utils';
import { Blockchain } from './blockchain';

export interface HarmonyModule {
  HttpProvider: HttpProvider;
  Messenger: Messenger;
  Blockchain: Blockchain;
  TransactionFactory: TransactionFactory;
  Wallet: Wallet;
  Transaction: Transaction;
  Account: Account;
}

export enum UrlType {
  http,
  ws,
}

export interface HarmonySetting<T extends ChainType, I extends ChainID> {
  type: T;
  id: I;
}
