import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Sidebar = ({
  match: { params: { estimateId } },
  recalc,
  saveEstimate,
  openAuthScreen,
}) => (
  <aside>
    <button
      type="button"
      onClick={() => recalc(estimateId)}
      title="Calculate estimate"
    >
      ✓
    </button>
    <button
      type="button"
    >
      ✗
    </button>
    <button
      type="button"
      onClick={() => saveEstimate({ estimateId })}
      title="Save estimate"
    >
      S
    </button>
    <Link to="/estimate/new">
      <button
        type="button"
        title="New estimate"
      >
        N
      </button>
    </Link>
    <button
      type="button"
      onClick={openAuthScreen}
      title="Enter credentials"
    >
      A
    </button>
    <Link to={`/estimate/${estimateId}`}>
      <button
        type="button"
        title="Show editor"
      >
        E
      </button>
    </Link>
    <Link to={`/estimate/${estimateId}/graph`}>
      <button
        type="button"
        title="Show graph"
      >
        G
      </button>
    </Link>
    <Link to="/dashboard">
      <button
        type="button"
        title="Show dashboard"
      >
        D
      </button>
    </Link>
  </aside>
)

Sidebar.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      estimateId: PropTypes.string,
    }).isRequired,
  }).isRequired,
  recalc: PropTypes.func.isRequired,
  saveEstimate: PropTypes.func.isRequired,
  openAuthScreen: PropTypes.func.isRequired,
}

export default Sidebar