import React from 'react';
import { Navbar, Tabs, Tab } from 'react-bootstrap';
import PublicServerList from './public-server-list.jsx';
import CustomServerForm from './custom-server-form.jsx';

class ServerBrowser extends React.Component {
  constructor(props) {
    super(props);

    // Default state
    this.state = {
    };

    // Private members
    // TODO

    // Prebind custom methods
    this.onSelect = this.onSelect.bind(this);
    this.onReceiveServerChallenge = this.onReceiveServerChallenge.bind(this);
  }

  /**
   * Handles a child component selecting a NINJAM server to connect to.
   * @param {string} host
   * @param {string} username
   * @param {string} password
   */
  onSelect(host, username, password) {
    console.log("Connecting to server %s as %s", host, username);
    this.context.ninjam.connect(host, username, password, this.onReceiveServerChallenge);
  }

  onReceiveServerChallenge() {
    // TODO: Ask user if they want to accept terms

    // Accept terms
    this.context.ninjam.respondToChallenge(true);
    // Tell app to change to jam view
    this.context.router.push('/jam');
  }

  render() {
    return (
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Ninjam JS</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <div style={{padding: "70px 50px"}}>
          <h1>Choose a Server</h1>
          <p>To jam with other musicians, first you need to choose a server to join.</p>
          <Tabs id="server-categories">
            <Tab eventKey={1} title="Public">
              <PublicServerList onSelect={this.onSelect} />
            </Tab>
            <Tab eventKey={2} title="jammr">Jammr connectivity coming soon!</Tab>
            <Tab eventKey={3} title="Recent">Content</Tab>
            <Tab eventKey={4} title="Custom">
              <CustomServerForm onSelect={this.onSelect} />
            </Tab>
          </Tabs>
        </div>
      </div>
    );
  }
}
// Context gained from parent
ServerBrowser.contextTypes = {
  router: React.PropTypes.object,
  ninjam: React.PropTypes.object,
};
export default ServerBrowser;
