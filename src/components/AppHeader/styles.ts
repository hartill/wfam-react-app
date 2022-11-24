import styled from '@emotion/styled'

export const Header = styled.div`
  padding: 0 1.5rem;
  flex: 0 0 38px;
  background: ${(props) => props.theme.colors.darkGrey};
  color: #ffffff;
  display: flex;
  align-items: stretch;
  border-bottom: 1px solid rgba(0,0,0,0.12);
  padding-top: 2px;
  font-weight: 500;
`

export const Breadcrumb = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;
`

export const BreadcrumbItem = styled.div`
  display: flex;
  align-items: center;

  &.faded {
    opacity: 0.5;
  }
`

export const BreadcrumbDivider = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.5;
  padding: 0 0.3rem;
`

export const LocationDetails = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: flex-end;
`

export const LocationIcon = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.5;
  padding: 0 0.1rem 0 0.7rem;
`

export const LocationText = styled.div`
  display: flex;
  align-items: center;
  opacity: 0.8;
`

export const Divider = styled.div`
  padding: 0 0.4rem;
`
