import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper'
import { Temporal } from 'temporal-polyfill'
import Image from './livein19202.png';
import NowNext from './NowNext';
import Upcoming from './Upcoming';

const urls = {
  test: 'https://jfayiszondlcqngo5vavioz6bq0ibxen.lambda-url.eu-west-1.on.aws/',
  live: 'https://ypdjc6zbc5cnvth24lk3mm45sm0qtgps.lambda-url.eu-west-1.on.aws'
};

const oneHour = 60 * 60;

function convertISOTimeToMilliSeconds(inISOTime) {
  const duration = Temporal.Duration.from(inISOTime);
  return (duration.hours * 60 * 60 * 1000) + (duration.minutes * 60 * 1000) + (duration.seconds * 1000) + duration.milliseconds;
}

function getFinalOnTime(durationInMillis, styling) {
  let finalOnTime = (styling === 'grownup' ? 0.93 : 0.88) * durationInMillis;
  if ((durationInMillis - finalOnTime) < 60000) {
    // console.log(`Programme very short, adjusting finalOnTime from ${finalOnTime} to ${(durationInMillis - 60000)}`);
    finalOnTime = (durationInMillis - 60000);
  }
  return finalOnTime;
}

function titlefor(o, rel) {
  return o.title_hierarchy?.titles?.find((t) => t.inherited_from?.link?.rel === `pips-meta:${rel}`)?.title?.$;
}

function gettitles(item) {
  const b = titlefor(item, 'brand');
  const s = titlefor(item, 'series');
  const e = item.title_hierarchy?.titles?.find((t) => !t.inherited_from)?.title?.$;
  const t = b ? `${b}` : '';
  if (s) {
    return {
      episodeTitle: `${e}`,
      brandTitle: `${t}`,
      seriesTitle: `${s}`,
    };
  }
  return {
    episodeTitle: `${e}`,
    brandTitle: `${t}`,
    seriesTitle: '',
  };
}

function chooseNext(next, minDuration) {
  const ok = (next || []).filter((e) => {
    if (e?.duration && e?.title) {
      return Temporal.Duration.compare(minDuration, Temporal.Duration.from(e.duration)) < 0;
    }
    return false;
  });
  if (ok.length > 0) {
    return ok[0];
  }
  return { title: '' };
}

function chooseNexts(next, minDuration, uvpids) {
  let matcheduvpids = [];
  console.log(`uvpids.length ${uvpids.length}`);
  // console.log(JSON.stringify(next, null, 2));
  if (uvpids.length > 0) {
    matcheduvpids = (next || []).filter((e) => {
      if (e?.duration && e?.title) {
        return (uvpids.includes(e?.vpid));
      }
      return false;
    });
  }
  if (matcheduvpids.length > 0) {
    const startAfterItem = Date.parse(matcheduvpids[0].start);
    const ok = (next || []).filter((e) => {
      if (e?.duration && e?.title) {
        return (Temporal.Duration.compare(minDuration, Temporal.Duration.from(e.duration)) < 0) && (Date.parse(e.start) > startAfterItem);
      }
      return false;
    });
    if (ok.length > 0) {
      // "next" is the list of next items to be displayed. "upcomingItems" is the list of
      // scheduled items that the "Next Items" overlays should be displayed over.
      return { "nexts": ok, "upcomingItems": matcheduvpids };
    }
  }

  return { "nexts": { title: '' }, "upcomingItems": matcheduvpids };
}

function OverlayManager({ params }) {
  const minDuration = Temporal.Duration.from(params.minDuration || 'PT2M');
  const previewMinutes = params.next ? parseInt(params.next) : 2;

  const env = params.env || 'live';
  const sid = params.sid || 'History_channel';
  const region = params.region || 'eu-west-1';
  const styling = params.styling || 'grownup';
  const uvpids = params?.uvpids?.split(',') || '';
  const nowThenLater = ['Next', 'Then', 'Later'];

  //Now Next react hooks
  const [on, setOn] = useState(false);
  const [now, setNow] = useState();
  const [lastLoadedNow, setLastLoadedNow] = useState('');
  const [next, setNext] = useState();
  const containerRef = React.useRef(null);

  //Upcoming react hooks
  const [nexts, setNexts] = useState([]);
  const [upcomingitems, setUpcomingItems] = useState([]);
  const [lastLoadedUpcoming, setLastLoadedUpcoming] = useState('');
  const [upcomingOn, setUpcomingOn] = useState(false);

  const FALSE = false;
  const mins25 = 25 * 60 * 1000;
  const mins55 = 55 * 60 * 1000;
  const mins120 = 120 * 60 * 1000;

  const firingSchedules = {
    'kids': [0.95],
    'short': [0.5],
    'medium': [0.4, 0.7],
    'long': [0.25, 0.55, 0.8],
  };

  useEffect(() => {
    const next = nexts.nexts;
    const upcomingItems = nexts.upcomingItems;
    // console.log(`got new nexts ${nexts}`);
    if (((next) && (next.length > 0)) && ((upcomingItems) && (upcomingItems.length > 0))) {
      const items = [];
      if (next.length > 0) {
        let itemsToAdd = 3;
        let addedCount = 0;
        let canAdd = true;
        const upcomingItem = upcomingItems[0];
        const upcomingStart = Date.parse(upcomingItem.start);
        console.log(`upcomingStart ${upcomingStart}`);
        while (canAdd) {
          // console.log('next[addedCount]', next[addedCount])
          let item = gettitles(next[addedCount]);
          if (nowThenLater[0]) {
            item.starting = nowThenLater[0];
            nowThenLater.shift();
          }
          const start = Date.parse(next[addedCount].start);
          const startTime = new Date(next[addedCount].start).toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit', hour12: true });
          // const secondsToNext = Math.round((start - (new Date())) / 1000);
          // console.log(`start ${start} upcompingstart ${upcomingStart}`);
          // console.log(`next item start ${next[addedCount].start} upcomping item start ${upcomingItem.start}`);
          const secondsToNext = Math.round((start - upcomingStart) / 1000);
          // console.log(`secondsToNext ${secondsToNext}`);
          if (secondsToNext < 60) {
            if ((secondsToNext >= 1) && (secondsToNext < 2)) {
              item.starting = `${item.starting} in 1 second`;
            } else if (secondsToNext >= 2) {
              item.starting = `${item.starting} in ${secondsToNext} seconds`;
            }
          } else if (secondsToNext < oneHour) {
            const minutesToNext = Math.round(secondsToNext / 60);
            item.starting = `${item.starting} in ${minutesToNext} ${minutesToNext === 1 ? 'minute' : 'minutes'}`;
          } else {
            item.starting = `${item.starting} at ${startTime}`;
          }
          console.log(`item.starting ${item.starting}`);
          items.push(item);
          addedCount += 1;
          canAdd = items.length < itemsToAdd && items.length < next.length;

        }
      }
      console.log('setting upcoming items');
      setUpcomingItems(items);
      //Set up upcoming firing schedule...
      const timeOutList = [];

      if (upcomingOn) {
        console.log('Adding clean up Off!');
        const cleanUpOff = setTimeout(() => {
          (async () => {
            console.log('Firing clean up Off!');
            setUpcomingOn(FALSE);
          })();
        }, 1000);
        timeOutList.push(cleanUpOff);
      }
      if (upcomingItems.length > 0) {
        const item = upcomingItems[0];
        const start = Date.parse(item.start);
        const fireOn = (start - (new Date()));
        const timeOn = setTimeout(() => {
          (async () => {
            setUpcomingOn(true);
          })();
        }, fireOn);
        timeOutList.push(timeOn);
        const timeOff = setTimeout(() => {
          (async () => {
            setUpcomingOn(false);
          })();
        }, fireOn + 15000);
        timeOutList.push(timeOff);
      }
      console.log(`We have set this many upcoming timeouts ${timeOutList.length}`);
      return () => {
        for (let i = 0; i < timeOutList.length; i += 1) {
          clearTimeout(timeOutList[i]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastLoadedUpcoming]);

  useEffect(() => {
    if (nexts) {
      const newLoadedUpcoming = nexts?.upcomingItems?.length > 0 ? `${nexts.upcomingItems[0].vpid}_${nexts.upcomingItems[0].start}_${nexts.upcomingItems[0].duration}` : '';
      if (lastLoadedUpcoming !== newLoadedUpcoming) {
        console.log(`Upcoming item we recognise has changed = setting up new On/Off Schedule ${newLoadedUpcoming}`);
        setLastLoadedUpcoming(newLoadedUpcoming);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nexts]);

  useEffect(() => {
    if (now) {
      const timeOutList = [];
      if (on) {
        console.log('Adding clean up Off!');
        const cleanUpOff = setTimeout(() => {
          (async () => {
            console.log('Firing clean up Off!');
            setOn(FALSE);
          })();
        }, 1000);
        timeOutList.push(cleanUpOff);
      }
      //We will only show Now/Next for items with a title hierarchy...
      if (now.title_hierarchy) {

        // console.log(`Now has changed = setting up new On/Off Schedule ${JSON.stringify(now, 2000, null)}`);
        const duration = now.duration;
        const durationInMillis = convertISOTimeToMilliSeconds(duration);
        const minimumProgrammeDuration = 120000; //600000;
        // This is the time that the Now/Next is visible:
        const visibleDuration = 15000;
        // const end = Temporal.Instant.from(now.start).add(Temporal.Duration.from(now.duration));
        console.log(`New Now durationInMillis ${durationInMillis} duration ${duration}`);
        if (durationInMillis > minimumProgrammeDuration) {
          if (styling === 'grownup') {
            const twominOn = setTimeout(() => {
              (async () => {
                console.log('first Now On!');
                setOn(true);
              })();
            }, 120000);
            timeOutList.push(twominOn);
            const twominOff = setTimeout(() => {
              (async () => {
                console.log('first Now Off!');
                setOn(FALSE);
              })();
            }, (120000 + visibleDuration));
            timeOutList.push(twominOff);

            //Select the firing Schdule...
            let firingSchedule = [];
            if ((durationInMillis > mins25) && (durationInMillis < mins55)) {
              firingSchedule = firingSchedules.short;
            } else if ((durationInMillis > mins55) && (durationInMillis < mins120)) {
              firingSchedule = firingSchedules.medium;
            } else if (durationInMillis > mins120) {
              firingSchedule = firingSchedules.long;
            }

            for (let i = 0; i < firingSchedule.length; i += 1) {
              console.log(`loading with ${firingSchedule[i]}`);
              const fireOn = firingSchedule[i] * durationInMillis;
              const timeOn = setTimeout(() => {
                (async () => {
                  setOn(true);
                })();
              }, fireOn);
              timeOutList.push(timeOn);
              const timeOff = setTimeout(() => {
                (async () => {
                  setOn(FALSE);
                })();
              }, fireOn + visibleDuration);
              timeOutList.push(timeOff);
            }
          }
          //Set the final On/OFF - 95% duration!
          const finalOnTime = getFinalOnTime(durationInMillis, styling);
          const finalOffTime = finalOnTime + visibleDuration;
          console.log(`finalOnTime ${finalOnTime} in milliseconds, finalOffTime in milliseconds ${finalOffTime}`);
          const lastOn = setTimeout(() => {
            (async () => {
              console.log('On Next On!');
              setOn(true);
            })();
          }, finalOnTime);
          timeOutList.push(lastOn);
          const lastOff = setTimeout(() => {
            (async () => {
              console.log('On Next Off!');
              setOn(FALSE);
            })();
          }, (finalOffTime));
          timeOutList.push(lastOff);
          console.log(`We have set this many timeouts ${timeOutList.length}`);

        }

      } else {
        console.log(`WARNING: Item does not have any titles (title_hierarchy) can't show NOW/NEXT! i.e. ${JSON.stringify(now, null, 2)}`)
      }
      return () => {
        for (let i = 0; i < timeOutList.length; i += 1) {
          clearTimeout(timeOutList[i]);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastLoadedNow]);

  useEffect(() => {
    if (now) {
      const newLoadedNow = JSON.stringify(now, 2000, null);
      if (lastLoadedNow !== newLoadedNow) {
        console.log(`Now has changed = setting up new On/Off Schedule ${JSON.stringify(now, 2000, null)}`);
        setLastLoadedNow(newLoadedNow);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [now]);

  // 5 second timer
  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      (async () => {
        try {
          const r = await fetch(`${urls[env]}/${sid}/${region}`);
          if (r.ok) {
            const data = await r.json()
            setNext(chooseNext(data.next, minDuration));
            setNow(data.now);
            console.log(`uvpids ${uvpids} upComingOn ${upcomingOn}`);
            if ((uvpids.length > 0) && (upcomingOn === false)) {
              // Grab the nexts to display and the time to display them in upcomingItems...
              const fndNexts = chooseNexts(data.next, minDuration, uvpids);
              // console.log(`fndNexts ${JSON.stringify(fndNexts, null, 2)}`);
              setNexts(fndNexts);
            }
          }
        } catch (error) {
          console.log(`Error with fetch: ${error}`);
        }
      })();
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <>{upcomingOn ?
      <Upcoming
        styling={styling}
        on={upcomingOn}
        upcomingitems={upcomingitems}
        tlOn={false}
        trOn={false}
      />
      :
      <NowNext
        styling={styling}
        on={on}
        containerRef={containerRef}
        now={now}
        next={next}
        previewMinutes={previewMinutes}
        tlOn={false}
        trOn={false}
      />
    }
    </>
  );
}

export default function App(params) {
  const demo = false;
  return (
    <Paper sx={
      demo === true ?
        { backgroundImage: `url(${Image})`, backgroundRepeat: 'round' }
        : { backgroundColor: 'transparent' }}>
      <OverlayManager params={params} ></OverlayManager>
    </Paper>
  );
}