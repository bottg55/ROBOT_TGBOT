import PropTypes from 'prop-types';
import React from 'react';

import { ExternalLink } from 'linode-components';
import { Table } from 'linode-components';
import { LinkCell } from 'linode-components';


export default function Python(props) {
  const { route } = props;
  const { pythonDataObjects } = route;
  const { pythonClientObjectTitles, pythonAPITitles } = pythonDataObjects;

  return (
    <section className="Article">
      <div className="EndpointIndex-header">
        <div className="Title">
          <div className="Title-heading clearfix">
            <h1>Python Library</h1>
            <div className="float-sm-right">
              <span className="GithubLink">
                See this project on <ExternalLink
                  to="https://github.com/linode/python-linode-api"
                >
                  <i className="fa fa-github"></i> GitHub
                </ExternalLink>.
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="EndpointIndex-group">
        <h3>Client Objects</h3>
        <Table
          className="Table--secondary"
          columns={[
            {
              cellComponent: LinkCell,
              textKey: 'path',
              label: 'Object',
              headerClassName: 'SectionColumn',
              hrefFn: function (subPage) {
                return subPage.href;
              },
            },
            { label: 'Description', dataKey: 'description' },
          ]}
          data={[
            ...pythonClientObjectTitles,
          ]}
        />
      </div>
      <div className="EndpointIndex-group">
        <h3>API Objects</h3>
        <Table
          className="Table--secondary"
          columns={[
            {
              cellComponent: LinkCell,
              textKey: 'path',
              label: 'Object',
              headerClassName: 'SectionColumn',
              hrefFn: function (subPage) {
                return subPage.href;
              },
            },
            { label: 'Description', dataKey: 'description' },
          ]}
          data={[
            ...pythonAPITitles,
          ]}
        />
      </div>
    </section>
  );
}

Python.propTypes = {
  route: PropTypes.object,
};
