import { Monaco } from '@monaco-editor/react';
import { darkTheme as theme } from '@takaro/lib-components';

/* eventually all used colors should become part of editorTheme but for now playing around with default colors to define what key has impact on what.
const editorTheme = {
  highlightBackground: '#202229',
  selectionBackground: theme.colors.primary
};
*/

export function defineTheme(monaco: Monaco) {
  const t: Record<string, string> = {};
  for (const [key, value] of Object.entries(theme.colors)) {
    t[key] = value.substring(1);
  }

  monaco.editor.defineTheme('takaro', {
    base: 'vs-dark',
    inherit: true,

    colors: {
      background: '#ff0000',
      foreground: '#e5e5e5',
      focusBorder: '#AD9CFF',
      'selection.background': '#6f6f6f',
      'scrollbar.shadow': '#0000007e',
      'input.background': '#0F0E0E',
      'input.foreground': '#999',
      'button.background': '#edffa5',
      'button.foreground': '#151515',
      'button.hoverBackground': '#dcff50',
      'textLink.foreground': '#e5e5e5',
      'button.secondaryForeground': '#c5c5c5',
      'button.secondaryBacground': '#2a2a2a',
      'button.secondaryHoverBackground': '#373737',

      'activityBar.foreground': '#dedede',
      'activityBar.background': '#000',
      'activityBar.inactiveForeground': '#999',
      'activityBarBadge.foreground': '#000',
      'activityBarBadge.background': '#edffa5',
      'activityBar.border': '#000',
      'actibityBar.activeBackground': '#151515',

      'sideBar.background': '#000',
      'sideBar.foreground': '#999',
      'sideBarSectionHeader.background': '#151515',
      'sideBarSectionHeader.border': '#00000000',
      'sideBarSectionHeader.foreground': '#e5e5e5',
      'sideBarTitle.foreground': '#e5e5e5',
      'sideBar.border': '#00000000',
      'list.dropBackground': '#151515',
      'list.focusForeground': '#808080',
      'list.focusBackground': '#e5e5e51a',
      'list.highlightForeground': '#e5e5e5',

      'statusBar.background': '#000',
      'statusBar.foreground': '#808080',
      'statusBar.border': '#00000000',
      'statusBar.debuggingBackground': '#563300',
      'statusBar.debuggingForeground': '#999',
      'statusBar.noFolderBackground': '#5d3fe0',
      'statusBar.noFolderForeground': '#e5e5e5',
      'statusBarItem.remoteBackground': '#cef144',
      'statusBarItem.remoteForeground': '#151515',

      'tab.activeBackground': '#151515',
      'tab.activeForeground': '#e5e5e5',
      'tab.inactiveBackground': '#000',
      'tab.inactiveForeground': '#999',
      'tab.hoverBackground': '#E5E5E51A',
      'tab.border': '#151515',

      'titleBar.activeBackground': '#000',
      'titleBar.activeForeground': '#808080',
      'titleBar.border': '#00000000',
      'titleBar.inactiveBackground': '#000',

      'menu.foreground': '#e5e5e5',
      'menu.background': '#373737',
      'menubar.selectionForeground': '#c5c5c5',
      'menubar.selectionBackground': '#e5e5e51a',
      'menu.selectionForeground': '#e5e5e5',
      'menu.selectionBackground': '#e5e5e51a',
      'menu.selectionBorder': '#00000000',
      'menu.border': '#00000000',

      'editor.background': '#151515',
      'editorLineNumber.foreground': '#858585',
      'editorLineNumber.activeForeground': '#c6c6c6',

      'editor.lineHighlightBackground': theme.colors.backgroundAlt,
      'editor.lineHighlightBorder': theme.colors.backgroundAlt,

      'breadcrumb.background': '#151515',
      'breadcrumb.foreground': '#999',
      'breadcrumb.focusForeground': '#e5e5e5',
      'editorGroupHeader.border': '#00000000',
      'editorGroupHeader.tabsBackground': '#000',

      'scrollbarSlider.background': '#79797966',
      'scrollbarSlider.hoverBackground': '#646464b3',
      'scrollbarSlider.activeBackground': '#bfbfbf66',

      'widget.shadow': '#0000005c',
      'editorWidget.foreground': '#ccc',
      'editorWidget.background': '#252526',
      'pickerGroup.border': '#3f3f46',
      'pickerGroup.foreground': '#3794ff',
      'editorWidget.resizeBorder': '#5f5f5f',
      'debugToolBar.background': '#333',
      'debugToolBar.border': '#474747',

      errorForeground: '#f48771',
      warningForeground: '#F7CC66',
      'editorError.foreground': '#f48771',
      'list.errorForeground': '#f48771',
      'list.warningForeground': '#F7CC66',
      'editorWarning.foreground': '#F7CC66',

      'gitDecoration.deletedResourceForeground': '#C54444',
      'gitDecoration.untrackedResourceForeground': '#9FE7A0',
      'gitDecoration.conflictingResourceForeground': '#ED6C6C',
      'gitDecoration.ignoredResourceForeground': '#585858',
      'gitDecoration.modifiedResourceForeground': '#DD763C',
    },

    rules: [
      { token: 'string', foreground: theme.colors.quaternary },
      {
        token: 'punctuation.definition.string',
        foreground: theme.colors.quaternary,
      },
      {
        token: 'constant.character.escape',
        foreground: theme.colors.quaternary,
      },
      {
        token: 'text.html constant.character.entity.named',
        foreground: theme.colors.quaternary,
      },
      { token: 'text.html.derivative', foreground: 'E5E5E5' },
      {
        token: 'punctuation.definition.entity.html',
        foreground: theme.colors.quaternary,
      },
      { token: 'template.expression.begin', foreground: '7AD9FB' },
      { token: 'template.expression.end', foreground: '7AD9FB' },
      {
        token: 'punctuation.definition.template-expression.begin',
        foreground: '7AD9FB',
      },
      {
        token: 'punctuation.definition.template-expression.end',
        foreground: '7AD9FB',
      },
      { token: 'constant', foreground: '7AD9FB' },
      { token: 'keyword', foreground: theme.colors.primary },
      { token: 'modifier', foreground: theme.colors.primary },
      { token: 'storage', foreground: theme.colors.primary },
      { token: 'punctuation.definition.block', foreground: '86897A' },
      { token: 'punctuation.definition.parameters', foreground: '86897A' },
      { token: 'meta.brace.round', foreground: '86897A' },
      { token: 'meta.jsx.children', foreground: 'E5E5E5' },
      { token: 'punctuation.accessor', foreground: '86897A' },
      { token: 'variable.other', foreground: 'ffffff' },
      { token: 'variable.parameter', foreground: 'ffffff' },
      { token: 'meta.embedded', foreground: 'E5E5E5' },
      { token: 'source.groovy.embedded', foreground: 'E5E5E5' },
      { token: 'meta.template.expression', foreground: 'E5E5E5' },
      { token: 'comment', foreground: '6f6f6f' },
      { token: 'docblock', foreground: '6f6f6f' },
      { token: 'meta.function-call', foreground: 'CDF861' },
      {
        token: 'entity.name.type.class',
        foreground: 'ffffff',
        fontStyle: 'underline',
      },
      { token: 'entity.name.type.module', foreground: 'CABEFF' },
      { token: 'meta.type.annotation', foreground: theme.colors.primary },
      { token: 'meta.type.annotation entity.name.type', foreground: 'CABEFF' },
      { token: 'variable.object.property', foreground: 'ffffff' },
      { token: 'entity.name.function', foreground: 'CDF861' },
      { token: 'meta.definition.variable', foreground: 'ffffff' },
      { token: 'modifier', foreground: theme.colors.primary },
      { token: 'variable.language.this', foreground: theme.colors.primary },
      { token: 'support.type.object', foreground: theme.colors.primary },
      { token: 'support.module', foreground: '7AD9FB', fontStyle: 'italic' },
      { token: 'support.node', foreground: '7AD9FB', fontStyle: 'italic' },
      { token: 'support.type.ts', foreground: '7AD9FB' },
      {
        token: 'entity.other.inherited-class',
        foreground: theme.colors.primary,
      },
      { token: 'keyword.operator', foreground: 'b3e8b4' },
      { token: 'storage.type.function.arrow', foreground: 'b3e8b4' },
      { token: 'variable.css', foreground: '7AD9FB' },
      { token: 'source.css', foreground: 'CDF861' },
      { token: 'entity.other.attribute-name', foreground: 'CDF861' },
      { token: 'entity.name.tag.css', foreground: 'CDF861' },
      { token: 'entity.other.attribute-name.id', foreground: 'CDF861' },
      { token: 'entity.other.attribute-name.class', foreground: 'CDF861' },
      { token: 'source.css meta.selector.css', foreground: 'CDF861' },
      { token: 'source.type.property-name.css', foreground: 'ffffff' },
      { token: 'support.function.css', foreground: theme.colors.primary },
      { token: 'support.constant.css', foreground: theme.colors.primary },
      { token: 'keyword.css', foreground: theme.colors.primary },
      { token: 'constant.numeric.css', foreground: theme.colors.primary },
      { token: 'constant.other.color.css', foreground: theme.colors.primary },
      { token: 'punctuation.section', foreground: '86897A' },
      { token: 'punctuation.separator', foreground: '86897A' },
      { token: 'punctuation.definition.entity.css', foreground: '86897A' },
      { token: 'punctuation.terminator.rule.css', foreground: 'E5E5E5' },
      { token: 'keyword.other.unit.css', foreground: 'CABEFF' },
      { token: 'string.css', foreground: 'CABEFF' },
      { token: 'punctuation.definition.string.css', foreground: 'CABEFF' },
      { token: 'support.type.property-name', foreground: 'ffffff' },
      { token: 'string.html', foreground: 'CDF861' },
      { token: 'punctuation.definition.tag', foreground: '86897A' },
      { token: 'entity.other.attribute-name', foreground: 'CABEFF' },
      { token: 'entity.name.tag', foreground: theme.colors.primary },
      { token: 'entity.name.tag.wildcard', foreground: 'CDF861' },
      { token: 'markup.markdown', foreground: 'ffffff' },
      { token: 'markup.heading.markdown', foreground: 'b3e8b4' },
      { token: 'punctuation.definition.bold.markdown', foreground: 'b3e8b4' },
      {
        token: 'punctuation.definition.link.description',
        foreground: 'b3e8b4',
      },
      { token: 'punctuation.definition.raw.markdown', foreground: 'b3e8b4' },
      { token: 'meta.paragraph.markdown', foreground: 'E5E5E5' },
      { token: 'text.html.markdown meta.attribute', foreground: 'CABEFF' },
      { token: 'entity.name.section', foreground: 'ffffff' },
      { token: 'string.other', foreground: 'ffffff' },
      { token: 'string.other.link', foreground: 'ffffff' },
      { token: 'punctuation.definition.markdown', foreground: 'b3e8b4' },
      { token: 'punctuation.definition.string', foreground: 'b3e8b4' },
      {
        token: 'punctuation.definition.string.begin.shell',
        foreground: 'b3e8b4',
      },
      { token: 'markup.underline.link', foreground: 'ffffff' },
      { token: 'markup.inline.raw', foreground: '86897A' },
    ],
  });
}
