﻿/* eslint-disable */
import { TypeStore } from "@needle-tools/engine"

// Import types
import { SyncedAnimator } from "../Animator/SyncedAnimator.js";
import { SyncedAnimatorControls_RandomValue } from "../Animator/Controls/SyncedAnimatorControls.js";
import { SyncedAnimatorControls_PlayAnim } from "../Animator/Controls/SyncedAnimatorControls.js";
import { SendBufferExample } from "../Messages/SendBufferExample.js";
import { SendBuffer_Model } from "../Messages/SendBuffer_Model.js";
import { SendMessageExample } from "../Messages/SendMessageExample.js";
import { TriggerEventListOnClick } from "../Messages/TriggerEventListOnClick.js";
import { PlayerStateUI } from "../Player/PlayerStateUI.js";
import { SampleNetworkedPlayer } from "../Player/SampleNetworkedPlayer.js";
import { SpawnSpotHandler } from "../Player/SpawnSpotHandler.js";
import { RoomData } from "../Rooms/RoomData.js";
import { RoomManager } from "../Rooms/RoomManager.js";

// Register types
TypeStore.add("SyncedAnimator", SyncedAnimator);
TypeStore.add("SyncedAnimatorControls_RandomValue", SyncedAnimatorControls_RandomValue);
TypeStore.add("SyncedAnimatorControls_PlayAnim", SyncedAnimatorControls_PlayAnim);
TypeStore.add("SendBufferExample", SendBufferExample);
TypeStore.add("SendBuffer_Model", SendBuffer_Model);
TypeStore.add("SendMessageExample", SendMessageExample);
TypeStore.add("TriggerEventListOnClick", TriggerEventListOnClick);
TypeStore.add("PlayerStateUI", PlayerStateUI);
TypeStore.add("SampleNetworkedPlayer", SampleNetworkedPlayer);
TypeStore.add("SpawnSpotHandler", SpawnSpotHandler);
TypeStore.add("RoomData", RoomData);
TypeStore.add("RoomManager", RoomManager);
