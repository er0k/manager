import { CreateDomainPayload, Domain } from 'linode-js-sdk/lib/domains';
import { connect } from 'react-redux';
import { ApplicationState } from 'src/store';
import {
  DomainId,
  UpdateDomainParams,
  upsertDomain
} from 'src/store/domains/domains.actions';
import {
  createDomain,
  deleteDomain,
  updateDomain
} from 'src/store/domains/domains.requests';
import { EntityError, ThunkDispatch } from 'src/store/types';
import { Action } from 'typescript-fsa';

export interface StateProps {
  domainsData?: Domain[];
  domainsLoading: boolean;
  domainsError: EntityError;
}

export interface DomainActionsProps {
  createDomain: (payload: CreateDomainPayload) => Promise<Domain>;
  updateDomain: (params: UpdateDomainParams & DomainId) => Promise<Domain>;
  deleteDomain: (domainId: DomainId) => Promise<{}>;
  upsertDomain: (domain: Domain) => Action<Domain>;
}

export type Props = StateProps & DomainActionsProps;

export default <InnerStateProps extends {}, TOuter extends {}>(
  mapDomainsToProps?: (
    ownProps: TOuter,
    domainsLoading: boolean,
    domainsError: EntityError,
    domains?: Domain[]
  ) => InnerStateProps
) =>
  connect(
    (state: ApplicationState, ownProps: TOuter) => {
      if (mapDomainsToProps) {
        return mapDomainsToProps(
          ownProps,
          state.__resources.domains.loading,
          state.__resources.domains.error,
          state.__resources.domains.data
        );
      }

      return {
        domainsLoading: state.__resources.domains.loading,
        domainsError: state.__resources.domains.error,
        domainsData: state.__resources.domains.data
      };
    },
    (dispatch: ThunkDispatch) => ({
      createDomain: (payload: CreateDomainPayload) =>
        dispatch(createDomain(payload)),
      updateDomain: (params: UpdateDomainParams & DomainId) =>
        dispatch(updateDomain(params)),
      deleteDomain: (domainId: DomainId) => dispatch(deleteDomain(domainId)),
      upsertDomain: (domain: Domain) => dispatch(upsertDomain(domain))
    })
  );
