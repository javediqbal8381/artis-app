import React from 'react';
import { Container, Typography, Grid, List, ListItem, Link } from '@mui/material';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import './footer.css'

const Footer = () => {
  return (
    <footer className="site-footer">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>About</Typography>
            <Typography variant="body1" align="justify" gutterBottom>
              Scanfcode.com <i>CODE WANTS TO BE SIMPLE</i> is an initiative to
              help the upcoming programmers with the code. Scanfcode focuses on
              providing the most efficient code or snippets as the code wants to
              be simple. We will help programmers build up concepts in different
              programming languages that include C, C++, Java, HTML, CSS,
              Bootstrap, JavaScript, PHP, Android, SQL and Algorithm.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>Categories</Typography>
            <List>
              <ListItem>
                <Link href="http://scanfcode.com/category/c-language/">C</Link>
              </ListItem>
              <ListItem>
                <Link href="http://scanfcode.com/category/front-end-development/">UI Design</Link>
              </ListItem>
              <ListItem>
                <Link href="http://scanfcode.com/category/back-end-development/">PHP</Link>
              </ListItem>
              <ListItem>
                <Link href="http://scanfcode.com/category/java-programming-language/">Java</Link>
              </ListItem>
              <ListItem>
                <Link href="http://scanfcode.com/category/android/">Android</Link>
              </ListItem>
              <ListItem>
                <Link href="http://scanfcode.com/category/templates/">Templates</Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <List>
              <ListItem>
                <Link href="http://scanfcode.com/about/">About Us</Link>
              </ListItem>
              <ListItem>
                <Link href="http://scanfcode.com/contact/">Contact Us</Link>
              </ListItem>
              <ListItem>
                <Link href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</Link>
              </ListItem>
              <ListItem>
                <Link href="http://scanfcode.com/privacy-policy/">Privacy Policy</Link>
              </ListItem>
              <ListItem>
                <Link href="http://scanfcode.com/sitemap/">Sitemap</Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
        <hr />
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="body2">
              Copyright &copy; 2017 All Rights Reserved by <Link href="#">Scanfcode</Link>.
            </Typography>
          </Grid>
          <Grid item>
            <List>
              <ListItem>
                <Link href="#" aria-label="Facebook"><FaFacebook /></Link>
              </ListItem>
              <ListItem>
                <Link href="#" aria-label="Twitter"><FaTwitter /></Link>
              </ListItem>
              <ListItem>
                <Link href="#" aria-label="LinkedIn"><FaLinkedin /></Link>
              </ListItem>
              <ListItem>
                <Link href="#" aria-label="GitHub"><FaGithub /></Link>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;
