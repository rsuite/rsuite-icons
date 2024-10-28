import React from 'react';
import type { Meta } from '@storybook/react';
import * as Icons from '../src/react';
import iconList from '../src/meta.json';

const meta: Meta = {
  title: 'Overview/All Icons'
};

export default meta;

// 展示所有图标的组件
export const AllIcons = () => (
  <>
    <style>
      {`
      .icon-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .icon-item{
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 56px;
        height: 56px;
        background-color: #f2f2f5;
        border-radius: 6px;
      }
      .icon-version {
        font-size: 10px;
        color: #999;
        position: absolute;
        bottom: 0;
        right: 0;
        display: none;
      }
      .icon-item:hover + .icon-version {
        display: block
      }
      `}
    </style>
    <div className="icon-list">
      {iconList.map(({ iconName, version }) => {
        const IconComponent = Icons[iconName];

        return (
          <div key={iconName} style={{ position: 'relative' }}>
            <div className="icon-item" title={iconName}>
              {IconComponent ? <IconComponent style={{ fontSize: 24, color: '#343434' }} /> : null}
            </div>
            {version ? <span className="icon-version">{version}</span> : null}
          </div>
        );
      })}
    </div>
  </>
);
