import React, { useEffect, useState } from "react";
import styles from "../styles/Drop.module.css";
import ToggleSwitch from "./ToggleSwitch";
import { BsToggleOff } from "react-icons/bs";
import GrCircleAlert from "react-icons/gr";
import axios from "axios";

const DropRoom = props => {
  /**
   * @param {string} org_Id
   * @param {string} member_Id
   * @param {Object} roomData
   * @returns {Promise<Object>}
   * @description create a new channel 
   */

  const org_id = localStorage.getItem("currentWorkspace");
  const member_id = localStorage.getItem("member_id");

  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [channelIsPrivate, setChannelIsPrivate] = useState(false);

  const roomData = {
    room_name: channelName,
    room_type: "CHANNEL",
    room_members: {
      member_Id: {
        role: "admin",
        starred: false,
        closed: false
      }
    },
    created_at: "2022-11-24 22:31:46.962454",
    description: channelDescription,
    topic: "None for now",
    is_private: channelIsPrivate,
    is_archived: false
  };

  const createNewChannel = async () => {
    try {
      if (org_id && member_id && roomData) {
        const createNewChannelResponse = await axios.post(
          `https://chat.zuri.chat/api/v1/org/${org_id}/members/${member_id}/rooms`,
          {
            ...roomData
          }
        );
        return createNewChannelResponse.data;
      }
      throw new Error("Invalid arguments");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    createNewChannel();
  };

  return props.trigger ? (
    <div
      className={`w-100 h-100 d-flex align-items-center justify-content-center ${styles.droproom__overlay} `}
    >
      <div
        className={`d-flex flex-column align-items-center justify-content-center ${styles.droproom}`}
      >
        {props.children}
        <div
          className={`w-100 d-flex flex-row justify-content-between align-items-center`}
        >
          <h1 className={`dispay-1`}>Create a channel</h1>
          <h1 onClick={() => props.setTrigger(false)}>x</h1>
        </div>
        <p className={`w-100 d-flex flex-wrap align-items-start `}>
          Channels are where your team communcicates. They're best when
          organized around a topic -- #marketing, for example.
        </p>
        <form
          action=""
          className={`w-100 mt-3 mb-3 d-flex flex-column justify-content-between align-items-start`}
        >
          <div className={`w-100 d-flex flex-column  `}>
            <span className={`w-100`}>
              <label>Name</label>
              <input
                className={`w-100`}
                type="text"
                placeholder="# e.g, plan-budget"
                value={channelName}
                onChange={e => setChannelName(e.target.value)}
                required
              />
            </span>
            <span className={`w-100`}>
              <label>
                Description <span>(optional)</span>
              </label>
              <input
                className={`w-100`}
                type="text"
                value={channelDescription}
                onChange={e => setChannelDescription(e.target.value)}
              />
              <label>
                <span>What's this channel about?</span>
              </label>
            </span>
          </div>
          <div
            className={`w-100 mt-10 d-flex flex-column justify-content-between align-items-start`}
          >
            <div className={`w-100 d-block ${styles.droproom__private}`}>
              <h4>Make Private</h4>
              <span className={`w-100 d-flex flex-row justify-content-between`}>
                <p className={`w-60`}>
                  When a channel is set to private, it can only be viewed or
                  joined by invitation
                </p>
                <ToggleSwitch label="Accept" />
              </span>
            </div>
            <div
              className={`w-100 d-flex flex-row align-items-center ${styles.droproom__footer}`}
            >
              <span className={`w-100 d-flex align-items-center mr-10`}>
                <input className={`mr-10`} type="checkbox" />
                <label className={`${styles.label}`}>
                  Share outside your workspace
                </label>
              </span>
              {/* <GrCircleAlert /> */}
              <button type="submit" onSubmit={handleSubmit}>
                Create
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    ""
  );
};

export default DropRoom;
