import {
  LogMint as LogMintEvent,
  LogPadding as LogPaddingEvent,
  LogVoter as LogVoterEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  SubmitCall as SubmitCall
} from "../generated/Chain/Chain"

import {
  LogMint,
  LogPadding,
  LogVoter,
  OwnershipTransferred,
  Price,
  AssetPair
} from "../generated/schema"

import {
  Bytes,
  BigInt
} from "@graphprotocol/graph-ts";

export function handleLogMint(event: LogMintEvent): void {
  let entity = new LogMint(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.minter = event.params.minter
  entity.blockId = event.params.blockId
  entity.staked = event.params.staked
  entity.power = event.params.power
  entity.save()
}

export function handleLogPadding(event: LogPaddingEvent): void {
  let entity = new LogPadding(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.executor = event.params.executor
  entity.timePadding = event.params.timePadding
  entity.save()
}

export function handleLogVoter(event: LogVoterEvent): void {
  let entity = new LogVoter(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.blockId = event.params.blockId
  entity.voter = event.params.voter
  entity.vote = event.params.vote
  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner
  entity.save()
}

export function handleSubmit(call: SubmitCall): void {

  let price = new Price(call.transaction.hash.toHex())

  let keys: Bytes[] = call.inputs._keys
  let values: BigInt[] = call.inputs._values
  let timestamp: BigInt = call.inputs._dataTimestamp

  for (let i = 0; i < keys.length; i++) {
    let key = keys[i].toHex()
    let assetPair = new AssetPair(key)
    assetPair.save()

    let value: BigInt = values[i]

    price.assetPair = assetPair.id
    price.timestamp = timestamp
    price.price = value
    price.save()
  }

}

// function hex_to_ascii(str1: string): string {
//   var hex = str1.toString();
//   var str = '';
//   for (var n = 0; n < hex.length; n += 2) {
//     str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
//   }
//   return str;
// }