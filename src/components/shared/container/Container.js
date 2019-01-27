import React from 'react';
import { Link, Route } from 'react-router-dom';

import Home from '../../home/Home';
import Writing from '../../writing/Writing';
import Post from '../../post/Post';
import Labs from '../../labs/Labs';

import './Container.css';

export default () => (
  <section className="container">
    <nav className="navigation">
      <Link to="/" className="logo">
        <span className="firstname">Chinedu</span>
        <span className="lastname"> Daniel </span>
        <span className="fancy-dot">.</span>
      </Link>

      <Link to="/writing">
        Writing
      </Link>

      <Link to="/labs">
        Labs
      </Link>

      <a href="#">Tidbits</a>
    </nav>

    <div>
      <Route exact path="/" component={Home} />
      <Route path="/writing" component={Writing} />
      <Route path="/labs" component={Labs} />
      <Route path="/posts/:year/:month/:date/:slug" component={Post} />
    </div>
  </section>
);
