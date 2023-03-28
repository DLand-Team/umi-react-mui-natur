const TABLE_NAME = 'hljs-ln';
const LINE_NAME = 'hljs-ln-line';
const CODE_BLOCK_NAME = 'hljs-ln-code';
const NUMBERS_BLOCK_NAME = 'hljs-ln-numbers';
const NUMBER_LINE_NAME = 'hljs-ln-n';
const DATA_ATTR_NAME = 'data-line-number';
const BREAK_LINE_REGEXP = /\r\n|\r|\n/g;

function getLines(text: string) {
	if (text.length === 0) return [];
	return text.split(BREAK_LINE_REGEXP);
}

/**
 * {@link https://wcoder.github.io/notes/string-format-for-string-formating-in-javascript}
 */
function format(formatStr: string, args: string[]) {
	return formatStr.replace(/\{(\d+)\}/g, function (m, n) {
		return args[n] !== undefined ? args[n] : m;
	});
}

export function addLineNumbers(inputHtml: string, { singleLine = true, startFrom = 1 } = {}) {
	const lines = getLines(inputHtml);

	// if last line contains only carriage return remove it
	if (lines[lines.length - 1].trim() === '') {
		lines.pop();
	}

	if (lines.length > 1 || singleLine) {
		let html = '';

		for (let i = 0, l = lines.length; i < l; i++) {
			html += format(
				'<tr>' +
					'<td class="{0} {1}" {3}="{5}">' +
					'<div class="{2}" {3}="{5}"></div>' +
					'</td>' +
					'<td class="{0} {4}" {3}="{5}">' +
					'{6}' +
					'</td>' +
					'</tr>',
				[
					LINE_NAME,
					NUMBERS_BLOCK_NAME,
					NUMBER_LINE_NAME,
					DATA_ATTR_NAME,
					CODE_BLOCK_NAME,
					String(i + startFrom),
					lines[i].length > 0 ? lines[i] : ' ',
				],
			);
		}

		return format('<table class="{0}">{1}</table>', [TABLE_NAME, html]);
	}

	return inputHtml;
}
