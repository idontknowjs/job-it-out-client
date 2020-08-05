import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import Grid from "@material-ui/core/Grid";
import ScreamSkeleton from "../util/ScreamSkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

class user extends Component {
  state = {
    profile: null,
    handle: null,
    screamIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle; // Get user handle from the route parameter.
    const screamId = this.props.match.params.screamId; // This may or may not exist

    if (screamId) this.setState({ screamIdParam: screamId });

    this.props.getUserData(handle); // Sets the user's screams to the global state.
    this.setState({ handle });
    // The user profile is just static, so it doesn't need to be stored in
    // global state.
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.match !== this.props.match) {
      const screamId = nextProps.match.params.screamId;
      if (screamId) this.setState({ screamIdParam: screamId, openDialog: true });
    }
  }
  render() {
    const { screams, loading } = this.props.data;
    const { handle, screamIdParam } = this.state;

    const screamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams === null || screams.length === 0 ? (
      <p>No screams from {handle}</p>
    ) : !screamIdParam ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      screams.map((scream) => {
        if (scream.screamId !== screamIdParam)
          return <Scream key={scream.screamId} scream={scream} />;
        else return <Scream key={scream.screamId} scream={scream} openDialog />;
      })
    );

    return (
      <Grid container justify="center" spacing={6}>
        <Grid item sm={7} xs={12}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.state.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
