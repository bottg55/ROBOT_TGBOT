import React, { Component, PropTypes } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Dropdown from '~/components/Dropdown';
import { LinodeStates, LinodeStatesReadable } from '~/constants';
import { changeDetailTab } from '../actions/detail';
import {
  updateLinode, powerOnLinode, powerOffLinode, rebootLinode,
} from '~/actions/api/linodes';

class LinodeDetailPage extends Component {
  constructor() {
    super();
    this.getLinode = this.getLinode.bind(this);
    this.render = this.render.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const linode = this.getLinode();
    if (!linode) {
      const { linodeId } = this.props.params;
      dispatch(updateLinode(linodeId));
    }
  }

  getLinode() {
    const { linodes } = this.props.linodes;
    const { linodeId } = this.props.params;
    return linodes[linodeId];
  }

  renderHeader(linode) {
    const { dispatch } = this.props;
    const label = linode.group ?
      <span>{linode.group}/{linode.label}</span> :
      <span>{linode.label}</span>;

    const dropdownElements = [
      {
        name: <span><i className="fa fa-refresh"></i> Reboot</span>,
        _action: rebootLinode,
        _condition: () => true,
      },
      {
        name: <span><i className="fa fa-power-off"></i> Power Off</span>,
        _action: powerOffLinode,
        _condition: () => linode.state === 'running',
      },
      {
        name: <span><i className="fa fa-power-off"></i> Power On</span>,
        _action: powerOnLinode,
        _condition: () => linode.state === 'offline',
      },
    ]
    .filter(element => element._condition())
    .map(element => ({ ...element, action: () => dispatch(element._action(linode.id)) }));

    return (
      <header>
        <h1>
          {label}
          <a href="#" className="edit-icon">
            <i className="fa fa-pencil"></i>
          </a>
        </h1>
        <span className={`linode-status ${linode.state}`}>
          {LinodeStatesReadable[linode.state]}
        </span>
        {LinodeStates.pending.indexOf(linode.state) !== -1 ? null :
          <span className="pull-right">
            <Dropdown elements={dropdownElements} />
          </span>}
      </header>
    );
  }

  render() {
    const linode = this.getLinode();
    if (!linode) return <span></span>;
    const { dispatch, detail } = this.props;

    return (
      <div className="details-page">
        <div className="li-breadcrumb">
          <span><Link to="/linodes">Linodes</Link></span>
          <span>></span>
          <span>{linode.label}</span>
        </div>
        <div className="card">
          {this.renderHeader(linode)}
          <Tabs
            onSelect={ix => dispatch(changeDetailTab(ix))}
            selectedIndex={detail.tab}
          >
            <TabList>
              <Tab>General</Tab>
              <Tab>Networking</Tab>
              <Tab>Resize</Tab>
              <Tab>Repair</Tab>
              <Tab>Backups</Tab>
              <Tab>Settings</Tab>
            </TabList>
            <TabPanel>
              <h2>Summary</h2>
            </TabPanel>
            <TabPanel>
              Networking Tab
            </TabPanel>
            <TabPanel>
              Resize Tab
            </TabPanel>
            <TabPanel>
              Repair Tab
            </TabPanel>
            <TabPanel>
              Backups Tab
            </TabPanel>
            <TabPanel>
              Settings Tab
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

LinodeDetailPage.propTypes = {
  dispatch: PropTypes.func,
  linodes: PropTypes.object,
  params: PropTypes.shape({
    linodeId: PropTypes.string,
  }),
  detail: PropTypes.object,
};

function select(state) {
  return { linodes: state.api.linodes, detail: state.linodes.detail };
}

export default connect(select)(LinodeDetailPage);
