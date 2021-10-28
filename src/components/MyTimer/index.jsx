import React, { useState } from 'react';
import { useTimer } from 'react-timer-hook';

export default function MyTimer({ expiryTimestamp, expire, shouldRestart }) {
  const { seconds, restart } = useTimer({
    expiryTimestamp,
    onExpire: expire,
  });

  return <span style={{ fontSize: '40px' }}>{seconds}</span>;
}
