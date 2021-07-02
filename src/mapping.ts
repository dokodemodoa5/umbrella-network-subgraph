import {
  LogMint as LogMintEvent,
  LogPadding as LogPaddingEvent,
  LogVoter as LogVoterEvent,
  OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/Chain/Chain"
import {
  LogMint,
  LogPadding,
  LogVoter,
  OwnershipTransferred
} from "../generated/schema"

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
