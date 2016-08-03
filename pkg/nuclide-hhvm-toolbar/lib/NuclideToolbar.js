'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import type ProjectStore from './ProjectStore';

import {React} from 'react-for-atom';
import HhvmToolbar from './HhvmToolbar';

type Props = {
  projectStore: ProjectStore,
};

type State = {
  currentFilePath: string,
  projectType: string,
};

class NuclideToolbar extends React.Component {
  props: Props;
  state: State;

  _disposable: ?IDisposable;

  constructor(props: Props) {
    super(props);
    this.state = {
      currentFilePath: '',
      projectType: 'Other',
    };
    this._disposable = null;
    (this: any)._updateStateFromStore = this._updateStateFromStore.bind(this);
  }

  componentWillMount() {
    this._disposable = this.props.projectStore.onChange(this._updateStateFromStore);
  }

  componentWillUnmount() {
    if (this._disposable) {
      this._disposable.dispose();
      this._disposable = null;
    }
  }

  _updateStateFromStore() {
    this.setState({
      currentFilePath: this.props.projectStore.getCurrentFilePath(),
      projectType: this.props.projectStore.getProjectType(),
    });
  }

  render(): ?React.Element<any> {
    if (this.state.projectType === 'Hhvm') {
      return (
        <HhvmToolbar
          ref="hhvmToolbar"
          targetFilePath={this.state.currentFilePath}
          projectStore={this.props.projectStore}
        />
      );
    } else {
      // Hide toolbar.
      return null;
    }
  }
}

module.exports = NuclideToolbar;
