import React, { useState } from "react";
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Temporal } from 'temporal-polyfill'
const iplayerPink = '#f54996';

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

function getFinalOnTime(durationInMillis, styling) {
  let finalOnTime = (styling === 'grownup' ? 0.93 : 0.88) * durationInMillis;
  if ((durationInMillis - finalOnTime) < 60000) {
    // console.log(`Programme very short, adjusting finalOnTime from ${finalOnTime} to ${(durationInMillis - 60000)}`);
    finalOnTime = (durationInMillis - 60000);
  }
  return finalOnTime;
}

function InnerNowNext({ now, next, previewMinutes, styling }) {

  let r;
  let brand;
  let seriesEpisode;
  let eventTitle;
  let eventTime;
  console.log(`Do we have a next? ${next ? JSON.stringify(next, null, 2) : 'undefined - no'}`);
  if (next) {
    const start = Date.parse(next.start);
    const minutesToNext = Math.round((start - (new Date())) / 1000 / 60);
    const durationInMillis = convertISOTimeToMilliSeconds(now.duration);
    const durationShownBeforeShowNext = getFinalOnTime(durationInMillis, styling);

    const durationShown = Math.round((new Date()) - Date.parse(now.start));
    // const timeToStartShowingNext = Temporal.Instant.from(now.start).add(Temporal.Duration.from(durationShownBeforeShowNext));

    if (minutesToNext <= 0) {
      r = '';
    }
    //if (minutesToNext < previewMinutes) {
    console.log(`We will show Next if the shown duration of the programme is greater than or equal to the duration of the programme that can be shown before we show "ON NEXT" (grownup 93%/ childrens 90%) i.e ${durationShown} >= ${durationShownBeforeShowNext} (durations are in milliseconds)`);
    if ((durationShown >= durationShownBeforeShowNext) || (minutesToNext < previewMinutes)) {
      const to = gettitles(next)
      r = `${to.brandTitle}`;
      seriesEpisode = to.seriesTitle ? `${to.seriesTitle}: ${to.episodeTitle}` : to.episodeTitle;
      eventTitle = 'ON NEXT';
      eventTime = styling === 'grownup' ? `  Starting in ${minutesToNext} mins` : '';
    }
  }
  console.log(`Did we set titles and are we going to show 'ON NEXT' ('undefined' means 'No')? ${eventTitle} ${r}`);
  if ((r) || (seriesEpisode)) {
    brand = r;
  } else {
    if (now) {
      const end = Temporal.Instant.from(now.start).add(Temporal.Duration.from(now.duration));
      console.log(`Now item start ${now.start} end ${end}`);
      const durationleft = Math.round(Temporal.Duration.from(Temporal.Now.instant().until(end)).seconds / 60);
      console.log(`Minutes left of Now playing? ${durationleft}`);
      const to = gettitles(now)
      brand = ` ${to.brandTitle}`;
      seriesEpisode = to.seriesTitle ? `${to.seriesTitle}: ${to.episodeTitle}` : to.episodeTitle;
      eventTitle = 'ON NOW';
      eventTime = (durationleft > 0) ? `  ${durationleft} mins left ` : '';
    } else {
      brand = '';
    }
  }
  return (
    <Box sx={{
      width: 'auto', height: '153px',
      display: 'grid', gridTemplateRows: '1fr 1fr 1fr', paddingLeft: '5%', paddingbottom: '5%'
    }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-end',
        }}
      >
        <Typography
          fontSize={'1.7rem'}>
          <span
            style={{
              fontFamily: 'BBCReithSans_W_ExBd',
              color: iplayerPink
            }}>
            {eventTitle}
          </span>
          &nbsp;&nbsp;{eventTime}</Typography>
      </Box>
      <Box>
        <Fade in={true} timeout={500}>
          <Typography
            fontFamily={'BBCReithSans_W_Bd'}
            fontSize={'2.6667rem'}>{brand}</Typography>
        </Fade>
      </Box>
      {styling === 'grownup' ?
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
          }}
        >
          <Fade in={true} timeout={500}>
            <Typography
              fontFamily={'BBCReithSans_W_Md'}
              fontSize={'2.2rem'}>{seriesEpisode}</Typography>
          </Fade>
        </Box>
        :
        ''
      }
    </Box>
  );
}

function convertISOTimeToMilliSeconds(inISOTime) {
  const duration = Temporal.Duration.from(inISOTime);
  return (duration.hours * 60 * 60 * 1000) + (duration.minutes * 60 * 1000) + (duration.seconds * 1000) + duration.milliseconds;
}

function Bottom({ styling, on, containerRef, now, next, previewMinutes }) {
  const [steady, setSteady] = useState(false);
  const FALSE = false;
  console.log(`steady ${steady}`);
  // console.log(`styling log ${styling}`);
  return (
    <Box sx={{ overflow: 'hidden' }} ref={containerRef}>
      <Slide direction="up"
        in={on} mountOnEnter unmountOnExit
        container={containerRef.current}
        onEntered={() => console.log('entered')}
        addEndListener={() => setSteady(FALSE)}
        timeout={500}>
        <Box sx={styling === 'grownup' ?
          {
            height: '153px', width: 'auto', color: 'white',
            background: 'linear-gradient(to right, rgba(15, 15, 15, .8), rgba(245, 73, 151, .8))',
            display: 'grid', gridTemplateColumns: '1fr', marginbottom: '100px'
          }
          : {
            height: '153px', width: 'auto', color: 'black',
            background: 'linear-gradient(to right, rgba(255, 255, 255, .9), rgba(255, 255, 255, .9))',
            display: 'grid', gridTemplateColumns: '1fr', marginbottom: '100px'
          }}>
          <Box display='flex' alignItems='center'>
            <InnerNowNext now={now} next={next} previewMinutes={previewMinutes} styling={styling} />
          </Box>
        </Box>
      </Slide>
    </Box>
  );
}

function TopLeft({ show }) {
  if (show) {
    return '';//<img src={logo} alt='CBeebies' />;
  }
  return '';
}

function TopRight({ show }) {
  if (show) {
    return <img alt='bounce' src='https://upload.wikimedia.org/wikipedia/commons/1/14/Animated_PNG_example_bouncing_beach_ball.png' />;
  }
  return '';
}

function NowNext({ styling, on, containerRef, now, next, previewMinutes, tlOn, trOn }) {

  return (
    <Box sx={{
      width: 'auto', height: '100vh',
      display: 'grid', gridTemplateRows: '0px 543px 153px 24px'
    }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
        <Box><TopLeft show={tlOn} /></Box>
        <Box></Box>
        <Box sx={{ display: 'block', marginLeft: 'auto' }}><TopRight show={trOn} /></Box>
      </Box>
      <Box></Box>
      <Bottom
        styling={styling}
        on={on}
        containerRef={containerRef}
        now={now}
        next={next}
        previewMinutes={previewMinutes} />
      <Box>
      </Box>
    </Box>
  );
}

export default NowNext;