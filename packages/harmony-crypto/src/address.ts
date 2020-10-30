/**
 * @packageDocumentation
 * @module harmony-crypto
 */

import {
  isAddress,
  isBech32Address,
  isBech32TestNetAddress,
  isBech32OneAddress,
  isBech32TestNetOneAddress,
} from '@harmony-js-time/utils';

import { toChecksumAddress } from './keyTool';
import { fromBech32, toBech32, HRP, tHRP, ONE_HRP, tONE_HRP } from './bech32';

/**
 * ### How to use it?
 *
 * ```
 * // Step 1: import the class
 * const { HarmonyAddress } = require('@harmony-js-time/crypto');
 *
 * // Step 2: call functions
 * const addr = 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7'
 * const res = HarmonyAddress.isValidBech32(addr);
 * console.log(res);
 * ```
 */
export class HarmonyAddress {
  /**
   * @example
   * ```
   * const addr = 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7'
   * const res = HarmonyAddress.isValidBech32(addr);
   * console.log(res);
   * ```
   */
  static isValidBasic(str: string) {
    const toTest = new HarmonyAddress(str);
    return toTest.raw === toTest.basic;
  }

  /**
   * @example
   * ```
   * const addr = 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7'
   * const res = HarmonyAddress.isValidChecksum(addr);
   * console.log(res);
   * ```
   */
  static isValidChecksum(str: string) {
    const toTest = new HarmonyAddress(str);
    return toTest.raw === toTest.checksum;
  }

  /**
   * @example
   * ```
   * const addr = 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7'
   * const res = HarmonyAddress.isValidBech32(addr);
   * console.log(res);
   * ```
   */
  static isValidBech32(str: string) {
    const toTest = new HarmonyAddress(str);
    return toTest.raw === toTest.bech32 || toTest.raw === toTest.bech32One;
  }

  /**
   * @example
   * ```
   * const addr = 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7'
   * const res = HarmonyAddress.isValidBech32TestNet(addr);
   * console.log(res);
   * ```
   */
  static isValidBech32TestNet(str: string) {
    const toTest = new HarmonyAddress(str);
    return toTest.raw === toTest.bech32TestNet || toTest.raw === toTest.bech32TestNetOne;
  }

  raw: string;
  basic: string;

  /**
   * get basicHex of the address
   *
   * @example
   * ```
   * const addr = 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7'
   * const instance = new HarmonyAddress(addr);
   * console.log(instance.basicHex);
   * ```
   */
  get basicHex() {
    return `0x${this.basic}`;
  }

  /**
   * @example
   * ```
   * const addr = 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7'
   * const instance = new HarmonyAddress(addr);
   * console.log(instance.checksum);
   * ```
   */
  get checksum() {
    return toChecksumAddress(`0x${this.basic}`);
  }

  /**
   * @example
   * ```
   * const addr = 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7'
   * const instance = new HarmonyAddress(addr);
   * console.log(instance.bech32);
   * ```
   */
  get bech32() {
    return toBech32(this.basic, HRP);
  }

  /**
   * @example
   * ```
   * const addr = 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7'
   * const instance = new HarmonyAddress(addr);
   * console.log(instance.bech32TestNet);
   * ```
   */
  get bech32TestNet() {
    return toBech32(this.basic, tHRP);
  }

  /**
   * @example
   * ```
   * const addr = 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7'
   * const instance = new HarmonyAddress(addr);
   * console.log(instance.bech32);
   * ```
   */
  get bech32One() {
    return toBech32(this.basic, ONE_HRP);
  }

  /**
   * @example
   * ```
   * const addr = 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7'
   * const instance = new HarmonyAddress(addr);
   * console.log(instance.bech32TestNet);
   * ```
   */
  get bech32TestNetOne() {
    return toBech32(this.basic, tONE_HRP);
  }

  constructor(raw: string) {
    this.raw = raw;
    this.basic = this.getBasic(this.raw);
  }

  /**
   * Check whether the address has an valid address format
   *
   * @param addr string, the address
   *
   * @example
   * ```
   * const addr = 'one103q7qe5t2505lypvltkqtddaef5tzfxwsse4z7'
   * const instance = new HarmonyAddress(addr);
   * const res = instance.getBasic(addr);
   * console.log(res)
   * ```
   */
  private getBasic(addr: string) {
    const basicBool = isAddress(addr);
    const bech32Bool = isBech32Address(addr);
    const bech32TestNetBool = isBech32TestNetAddress(addr);
    const bech32OneBool = isBech32OneAddress(addr);
    const bech32TestNetOneBool = isBech32TestNetOneAddress(addr);

    if (basicBool) {
      return addr.replace('0x', '').toLowerCase();
    }

    if (bech32Bool) {
      const fromB32 = fromBech32(addr, HRP);
      return fromB32.replace('0x', '').toLowerCase();
    }

    if (bech32TestNetBool) {
      const fromB32TestNet = fromBech32(addr, tHRP);
      return fromB32TestNet.replace('0x', '').toLowerCase();
    }

    if (bech32OneBool) {
      const fromB32 = fromBech32(addr, ONE_HRP);
      return fromB32.replace('0x', '').toLowerCase();
    }

    if (bech32TestNetOneBool) {
      const fromB32TestNet = fromBech32(addr, tONE_HRP);
      return fromB32TestNet.replace('0x', '').toLowerCase();
    }

    throw new Error(`"${addr}" is an invalid address format`);
  }
}

/**
 * Using this function to get Harmony format address
 *
 * @param address
 *
 * @example
 * ```javascript
 * const { Harmony } = require('@harmony-js-time/core');
 * const { ChainID, ChainType } = require('@harmony-js-time/utils');
 * const { randomBytes } = require('@harmony-js-time/crypto')
 *
 * const hmy = new Harmony(
 *   'http://localhost:9500',
 *   {
 *   chainType: ChainType.Harmony,
 *   chainId: ChainID.HmyLocal,
 *   },
 * );
 *
 * const bytes = randomBytes(20);
 * const hAddress = hmy.crypto.getAddress(bytes);
 * console.log(hAddress)
 * ```
 */
export function getAddress(address: string) {
  try {
    return new HarmonyAddress(address);
  } catch (error) {
    throw error;
  }
}
