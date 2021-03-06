import * as React from 'react';
import {
  Redirect,
  Route,
  RouteComponentProps,
  Switch,
  withRouter
} from 'react-router-dom';

const VolumesLanding = React.lazy(() => import('./VolumesLanding'));

const VolumeCreate = React.lazy(() => import('./VolumeCreate/VolumeCreate'));

type Props = RouteComponentProps<{}>;

class Volumes extends React.Component<Props> {
  render() {
    const {
      match: { path }
    } = this.props;

    return (
      <Switch>
        <Route component={VolumesLanding} path={path} exact strict />
        <Route component={VolumeCreate} path={`${path}/create`} exact strict />
        <Redirect to={path} />
      </Switch>
    );
  }
}

export default withRouter(Volumes);
