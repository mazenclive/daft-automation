import { TemplateFunction, TemplateProp } from '../types';

enum TemplatePlaceHolder {
  ADDRESS = '__SCRIPT_ADDRESS__',
}

// Utility function to generate message template
//May there is a better way to do this ⊙︿⊙
export function template(
  templateLines: TemplateStringsArray,
  ...variables: TemplateFunction[]
) {
  return templateLines
    .map(
      (chunk, index) =>
        `${chunk}${
          variables[index]
            ? variables[index]({ address: TemplatePlaceHolder.ADDRESS })
            : ''
        }`
    )
    .join('');
}

export function getStringFromTemplate(
  templateString: string,
  props: TemplateProp
) {
  return templateString.replaceAll(
    new RegExp(TemplatePlaceHolder.ADDRESS, 'gi'),
    props.address
  );
}
