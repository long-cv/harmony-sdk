/**
 * @packageDocumentation
 * @module harmony-account
 * @hidden
 */

import { HttpProvider, Messenger } from '@harmony-js-time/network';
import { ChainType, ChainID } from '@harmony-js-time/utils';

export const defaultMessenger = new Messenger(
  new HttpProvider('http://localhost:9500'),
  ChainType.Harmony,
  ChainID.HmyLocal,
);
