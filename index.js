const path = require('path')

const ruleChildren = (loader) => loader.use || loader.oneOf || Array.isArray(loader.loader) && loader.loader || []

const findIndexAndRules = (rulesSource, ruleMatcher) => {
    let result = undefined
    const rules = Array.isArray(rulesSource) ? rulesSource : ruleChildren(rulesSource)
    rules.some((rule, index) => result = ruleMatcher(rule) ? {index, rules} : findIndexAndRules(ruleChildren(rule), ruleMatcher))
    return result
}

const findRule = (rulesSource, ruleMatcher) => {
    const {index, rules} = findIndexAndRules(rulesSource, ruleMatcher)
    return rules[index]
}

const cssRuleMatcher = (rule) => rule.test && String(rule.test) === String(/\.css$/)

const createLoaderMatcher = (loader) => (rule) => rule.loader && rule.loader.indexOf(`${path.sep}${loader}${path.sep}`) !== -1
const cssLoaderMatcher = createLoaderMatcher('css-loader')
const postcssLoaderMatcher = createLoaderMatcher('postcss-loader')
const fileLoaderMatcher = createLoaderMatcher('file-loader')


module.exports = function (config, env,postcssOptions) {
    
    const cssModulesRule = findRule(config.module.rules, cssRuleMatcher)

    cssModulesRule.exclude =  /node_modules|antd-mobile\.css/;

    const cssModulesRuleCssLoader = findRule(cssModulesRule, cssLoaderMatcher)
    cssModulesRuleCssLoader.options = Object.assign({modules: true, localIdentName: '[local]___[hash:base64:5]'}, cssModulesRuleCssLoader.options);

    const postcssModulesRuleLoader=findRule(cssModulesRule, postcssLoaderMatcher)
    const plugins = postcssModulesRuleLoader.options.plugins(); // func
    plugins.unshift(require('postcss-preset-env')(postcssOptions));
    postcssModulesRuleLoader.options.plugins=() => plugins;
 
    return config
}
