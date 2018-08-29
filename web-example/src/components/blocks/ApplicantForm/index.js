import React, { Component } from 'react'
import PropTypes from 'prop-types'

import cx from 'classnames'
import MdHighlightRemove from 'react-icons/lib/md/highlight-remove'
import MdPerson from 'react-icons/lib/md/person'
import MdAccessTime from 'react-icons/lib/md/access-time'
import MdEvent from 'react-icons/lib/md/event'

import face from 'components/ui/Avatar/noImage.png'

import { createSuit } from 'helpers/styles'

import './styles.css'

const suit = createSuit('ApplicantForm')

class ApplicantForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isDeleteWindowShown: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isDeleteWindowShown: false
    })
  }

  onDeleteClick = event => {
    this.setState({ isDeleteWindowShown: true })
  }

  onCancelDeleteClick = event => {
    this.setState({ isDeleteWindowShown: false })
  }

  onSubmitDeleteClick = event => {
    this.setState({ isDeleteWindowShown: false })
    let applicantId = 0

    for (const key in this.props.applicants.entities.applicants) {
      if (
        this.props.applicants.entities.applicants[key].profile.id ===
        this.props.applicant.id
      ) {
        applicantId = key
      }
    }

    this.props.destroyApplicant(applicantId)
  }

  onPendingClick = () => {
    this.props.toggleState()
    const data = {
      data: {
        id: '258',
        type: 'applicants',
        attributes: {
          state: 'pending',
          position: null,
          'created-at': '2017-07-16T20:53:26.702+00:00',
          'updated-at': '2017-07-16T20:53:26.702+00:00'
        },
        relationships: {
          profile: {
            data: null
          },
          user: {
            data: {
              id: '2050',
              type: 'users'
            }
          },
          company: {
            data: {
              id: '1141',
              type: 'companies'
            }
          }
        }
      }
    }

    let applicantId = 0

    for (const key in this.props.applicants.entities.applicants) {
      if (
        this.props.applicants.entities.applicants[key].profile.id ===
        this.props.applicant.id
      ) {
        applicantId = key
      }
    }

    this.props.setApplicantPending(data, applicantId)
  }

  render() {
    const { applicant } = this.props
    return (
      <div className={suit()}>
        {applicant.state === 'pending' &&
          <div className={suit('top-line')}>Pending</div>}
        <div className={suit('caption')}>
          <img alt="user avatar" height="130" src={face} width="132" />
          <p>
            {[applicant['first-name'], applicant['last-name']].join(' ')}
          </p>
        </div>
        {this.state.isDeleteWindowShown
          ? <div className={suit('submit_delete')}>
              <div>
                Are you sure you would like to delete the applicant from this
                role?
              </div>
              <button
                className={cx(suit('button'), suit('submit_btn'))}
                onClick={this.onSubmitDeleteClick}
              >
                Yes, delete
              </button>
              <button
                className={cx(suit('button'), suit('cancel_btn'))}
                onClick={this.onCancelDeleteClick}
              >
                Cancel
              </button>
            </div>
          : <div className={suit('applicant-info')}>
              <div className={suit('main')}>
                <div className={suit('data-value-wrapper')}>
                  <div className={suit('data-name')}>Age:</div>
                  <div className={suit('data-value')}>
                    &nbsp;{Math.round(
                      Math.abs(new Date() - new Date(applicant.birthdate)) /
                        (365 * 24 * 60 * 60 * 1000)
                    )}
                  </div>
                </div>
                <div className={suit('data-value-wrapper')}>
                  <div className={suit('data-name')}>Languages spoken:</div>
                  <div className={suit('data-value')}>&nbsp;English</div>
                </div>
              </div>
              <div className={suit('contact-header')}>
                <div className={suit('data-value-wrapper')}>
                  <div className={cx(suit('data-name'), suit('header-value'))}>
                    contact
                  </div>
                  <div className={suit('data-value')} />
                </div>
              </div>
              <div className={suit('contact')}>
                <div className={suit('data-value-wrapper')}>
                  <div className={suit('data-name')}>Email:</div>
                  <div className={suit('data-value')}>
                    &nbsp;{applicant.email}
                  </div>
                </div>
                <div className={suit('data-value-wrapper')}>
                  <div className={suit('data-name')}>Phone:</div>
                  <div className={suit('data-value')}>
                    &nbsp;{applicant.phone}
                  </div>
                </div>
                <div className={suit('data-value-wrapper')}>
                  <div className={suit('data-name')}>Adress:</div>
                  <div className={suit('data-value')}>
                    &nbsp;{applicant.address}
                  </div>
                </div>
              </div>
              <div className={suit('skills-header')}>
                <div className={suit('data-value-wrapper')}>
                  <div className={cx(suit('data-name'), suit('header-value'))}>
                    skills
                  </div>
                  <div className={suit('data-value')} />
                </div>
              </div>
              <div className={suit('skills')}>
                <div className={suit('data-value-wrapper')}>
                  <div className={suit('data-name')}>Work experience:</div>
                  <div className={suit('data-value')}>&nbsp;Firts job</div>
                </div>
                <div className={suit('data-value-wrapper')}>
                  <div className={suit('data-name')}>Highest Education:</div>
                  <div className={suit('data-value')}>
                    &nbsp;Graduated from college Burget High School
                  </div>
                </div>
              </div>
              <div className={suit('car')}>
                <div className={suit('data-value-wrapper')}>
                  <div className={suit('data-name')}>Access to a car:</div>
                  <div className={suit('data-value')}>&nbsp;Yes</div>
                </div>
              </div>

              {applicant.state === 'pending'
                ? <div className={suit('pending_buttons')}>
                    <button
                      className={cx(suit('button'), suit('delete_btn'))}
                      onClick={this.onDeleteClick}
                    >
                      <MdHighlightRemove
                        className={suit('remove_icon')}
                      />Delete
                    </button>
                    <button
                      className={cx(suit('button'), suit('interview_btn'))}
                      onClick={() => this.props.toggleState('interview')}
                    >
                      <MdEvent className={suit('phone_icon')} />Interview
                    </button>
                  </div>
                : applicant.state === 'interview'
                  ? <div className={suit('interview_buttons')}>
                      <button
                        className={cx(suit('button'), suit('delete_btn'))}
                        onClick={this.onDeleteClick}
                      >
                        <MdHighlightRemove
                          className={suit('remove_icon')}
                        />Delete
                      </button>
                      <button
                        className={cx(suit('button'), suit('interview_btn'))}
                        onClick={() => this.props.toggleState('interview')}
                      >
                        <MdEvent className={suit('phone_icon')} />Interview
                      </button>
                    </div>
                  : <div className={suit('new_buttons')}>
                      <button
                        className={cx(suit('button'), suit('delete_btn'))}
                        onClick={this.onDeleteClick}
                      >
                        <MdHighlightRemove
                          className={suit('remove_icon')}
                        />Delete
                      </button>
                      <button
                        className={cx(suit('button'), suit('pending_btn'))}
                        onClick={this.onPendingClick}
                      >
                        <i>
                          <MdPerson className={suit('person_icon')} />
                          <MdAccessTime className={suit('clock_icon')} />
                        </i>{' '}
                        Pending
                      </button>
                      <button
                        className={cx(suit('button'), suit('interview_btn'))}
                        onClick={() => this.props.toggleState('interview')}
                      >
                        <MdEvent className={suit('phone_icon')} />Interview
                      </button>
                    </div>}
            </div>}
      </div>
    )
  }
}

ApplicantForm.propTypes = {
  applicant: PropTypes.object,
  setApplicantPending: PropTypes.func,
  toggleState: PropTypes.func
}

export { ApplicantForm }
