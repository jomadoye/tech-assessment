import React from 'react';

const Footer = () => (
  <footer className="page-footer teal darken-4">
    <div className="container">
      <div className="row">
        <div className="col l6 s12">
          <h5 className="white-text">Tech Assesment</h5>
          <p className="grey-text text-lighten-4" />
        </div>
        <div className="col l4 offset-l2 s12">
          <h5 className="white-text">Informations</h5>
          <ul>
            <li><a className="grey-text text-lighten-3"
              href="https://github.com/jomadoye/tech-assessment">
                Github</a></li>
            <li><a className="grey-text text-lighten-3"
  href="https://github.com/jomadoye/tech-assessment/issues">
                Submit Issues</a></li>
            <li><a className="grey-text text-lighten-3"
    href="https://github.com/jomadoye/tech-assessment/wiki">
                Contributing</a></li>
            <li><a className="grey-text text-lighten-3"
              href="https://slimjed.github.io/">Author</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="footer-copyright">
      <div className="container">
      © 2018 Omadoye Jedidiah
      <a className="grey-text text-lighten-4 right"
      href="https://slimjed.github.io/">About Tech Assesment app</a>
      </div>
    </div>
  </footer>
);
export default Footer;
