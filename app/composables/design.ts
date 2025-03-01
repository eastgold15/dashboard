import variables from '~/assets/styles/variables.module.scss'

export function useDesign() {
  const scssVariables = variables
  const getPrefixCls = (scope?: string) => {
    return `${scssVariables.namespace}-${scope}`
  }

  return {
    variables: scssVariables,
    getPrefixCls,
  }
}
