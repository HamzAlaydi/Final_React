import React from 'react'
import {Box, Container,styled} from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import {Link} from 'react-router-dom'
import payemnt from '../../../images/paymeny.png'
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const IconWrapper = styled(Box)({
    width:"30px",
    height:"30px",
    borderRadius:"50%",
    backgroundColor:"#005B8E",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    padding:"2px"
})

const MatLink = styled(Link)({
    color:"#6D6D6D",
    fontSize:"14px"
})

const Image = styled('img')({
    width:"200px"
})

export default function LinksFooter() {
    const {t} = useTranslation()
    const {student} = useSelector((state)=>state.student)

    return (
        <Box sx={{backgroundColor:"#d9d9d952"}}>
            <Container sx={{padding:"20px",display:"flex",columnGap:"12px",justifyContent:"space-between",
            alignItems:"center",flexDirection:{md:"row",xs:"column"},rowGap:"16px"}}>
                <Box sx={{display:"flex",columnGap:"4px"}}>
                    <IconWrapper><FacebookIcon sx={{fontSize:"18px",color:"white"}}/></IconWrapper>
                    <IconWrapper><TwitterIcon sx={{fontSize:"18px",color:"white"}}/></IconWrapper>
                    <IconWrapper><LinkedInIcon sx={{fontSize:"18px",color:"white"}}/></IconWrapper>
                    <IconWrapper><InstagramIcon sx={{fontSize:"18px",color:"white"}}/></IconWrapper>
                </Box>
                <Box sx={{display:"flex",columnGap:"18px",alignItems:"center",flexWrap:"wrap"}}>
                    <MatLink to="/about-us">{t('aboutUs')}</MatLink>
                    <MatLink to="/TermsAndConditions">{t('TermsAndConditions')}</MatLink>
                    <MatLink to="/PrivacyPolicy">{t('PrivacyPolicy')}</MatLink>
                    <MatLink to="/pay-now">{t('paynow')}</MatLink>
                    {student&&<MatLink to="/map-browser">{t('mapBroswer')}</MatLink>}
                </Box>
                <Box sx={{display:"flex",columnGap:"4px",alignItems:"center"}}>
                    <Image src={payemnt}/>
                </Box>
            </Container>
        </Box>
    )
}
