import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { SequenceAnimator } from 'react-sequence-animator';
import i00 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00000.png';
import i01 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00001.png';
import i02 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00002.png';
import i03 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00003.png';
import i04 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00004.png';
import i05 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00005.png';
import i06 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00006.png';
import i07 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00007.png';
import i08 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00008.png';
import i09 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00009.png';
import i10 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00010.png';
import i11 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00011.png';
import i12 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00012.png';
import i13 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00013.png';
import i14 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00014.png';
import i15 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00015.png';
import i16 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00016.png';
import i17 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00017.png';
import i18 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00018.png';
import i19 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00019.png';
import i20 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00020.png';
import i21 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00021.png';
import i22 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00022.png';
import i23 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00023.png';
import i24 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00024.png';
import i25 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00025.png';
import i26 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00026.png';
import i27 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00027.png';
import i28 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00028.png';
import i29 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00029.png';
import i30 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00030.png';
import i31 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00031.png';
import i32 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00032.png';
import i33 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00033.png';
import i34 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00034.png';
import i35 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00035.png';
import i36 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00036.png';
import i37 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00037.png';
import i38 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00038.png';
import i39 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00039.png';
import i40 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00040.png';
import i41 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00041.png';
import i42 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00042.png';
import i43 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00043.png';
import i44 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00044.png';
import i45 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00045.png';
import i46 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00046.png';
import i47 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00047.png';
import i48 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00048.png';
import i49 from '../images/intro/Chameleon_LT_IPP_Block_Opener_00049.png';

const introImages = [
    i00, i01, i02, i03, i04, i05, i06, i07, i08, i09,
    i10, i11, i12, i13, i14, i15, i16, i17, i18, i19,
    i20, i21, i22, i23, i24, i25, i26, i27, i28, i29,
    i30, i31, i32, i33, i34, i35, i36, i37, i38, i39,
    i40, i41, i42, i43, i44, i45, i46, i47, i48, i49,
];

const iplayerPink = '#f54996';

function InnerUpComing({ upcomingitems }) {
    let eventTitle = 'COMING UP';

    return (
        <Box sx={{
            width: 'auto', height: '620px',
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
                    fontSize={'1.7rem'} key={eventTitle}>
                    <span
                        style={{
                            fontFamily: 'BBCReithSans_W_ExBd',
                            color: iplayerPink
                        }}>
                        {eventTitle}
                    </span>
                </Typography>
            </Box>
            <Box>
                {upcomingitems.map((item) => {
                    return (
                        <div key={item.starting + item.brandTitle + (item.seriesTitle ? `${item.seriesTitle}: ${item.episodeTitle}` : item.episodeTitle)}>
                            {item.starting ? <Box>
                                <Typography
                                    fontFamily={'BBCReithSans_W_Md'}
                                    fontSize={'1.7rem'} style={{ color: "#a9a9a9" }} >&nbsp;&nbsp;{item.starting}
                                </Typography>
                            </Box> : ''}
                            {item.brandTitle ?
                                <Box>
                                    <Typography
                                        fontFamily={'BBCReithSans_W_Bd'}
                                        fontSize={'2.6667rem'}>&nbsp;&nbsp;&nbsp;&nbsp;{item.brandTitle}</Typography>
                                </Box> : ''}
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    alignContent: 'flex-start',
                                }}
                            >
                                <Typography
                                    fontFamily={'BBCReithSans_W_Md'}
                                    fontSize={'2.2rem'}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.seriesTitle ? `${item.seriesTitle}: ${item.episodeTitle}` : item.episodeTitle}</Typography>
                            </Box>
                        </div>
                    )
                })}
            </Box>
            <Box></Box>
        </Box>
    );
}

// function convertISOTimeToMilliSeconds(inISOTime) {
//   const duration = Temporal.Duration.from(inISOTime);
//   return (duration.hours * 60 * 60 * 1000) + (duration.minutes * 60 * 1000) + (duration.seconds * 1000) + duration.milliseconds;
// }

function Middle({ upcomingitems }) {
    // const containerRef = React.useRef(null);

    return (
        <Box sx={{ overflow: 'hidden' }}>
            <Box display='flex' alignItems='center'>
                <InnerUpComing upcomingitems={upcomingitems} />
            </Box>
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

function Upcoming({ styling, on, upcomingitems, tlOn, trOn }) {
    const [steady, setSteady] = useState(false);
    const timerRef = useRef(null);
    useEffect(() => {
        console.log(`steady is ${steady}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [steady])
    
      useEffect(() => {
        // Clear the timeOut when the component unmounts
        return () => clearTimeout(timerRef.current);
      }, []);
    
      const pauseSequence = () => {
        setSteady(false);
        timerRef.current = setTimeout(() => setSteady(true), 5000);
      }

return (
<Fade   in={on} timeout={500} addEndListener={() => setSteady(true)}>
        <Box
          sx={
            styling === 'grownup' ?
              {
                zIndex: 1300,
                height: '720px', width: 'auto', color: 'white',
                background: 'linear-gradient(to right, rgba(15, 15, 15, .8), rgba(245, 73, 151, .8))',
                display: 'grid', gridTemplateRows: '50px 620px 50px', gridTemplateColumns: '1fr', marginbottom: '100px'
              }
              : {
                zIndex: 1300,
                height: '720px', width: 'auto', color: 'black',
                background: 'linear-gradient(to right, rgba(255, 255, 255, .9), rgba(255, 255, 255, .9))',
                display: 'grid', gridTemplateRows: '50px 620px 50px', gridTemplateColumns: '1fr', marginbottom: '100px'
              }}

        >
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
            <Box><TopLeft show={tlOn} /></Box>
            <Box>
              {steady ? <SequenceAnimator duration={3000} loop={steady} onSequenceEnd={() => pauseSequence()}>
                {introImages.map((im, index) => (<img key={index} src={im} alt='BBC' />))}
              </SequenceAnimator> : <></>}
            </Box>
            <Box sx={{ display: 'block', marginLeft: 'auto' }}><TopRight show={trOn} /></Box>
          </Box>
          <Middle upcomingitems={upcomingitems} styling={styling} />
          <Box></Box>
        </Box>
      </Fade>
    );
}

export default Upcoming;