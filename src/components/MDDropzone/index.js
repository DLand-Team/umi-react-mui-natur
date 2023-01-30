/**
=========================================================
* Otis Admin PRO - v2.0.1
=========================================================

* Product Page: https://material-ui.com/store/items/otis-admin-pro-material-dashboard-react/
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useEffect, useRef } from 'react';

// prop-types is a library for typechecking of props
import PropTypes from 'prop-types';

// Dropzone components
import Dropzone from 'dropzone';

// Dropzone styles
import 'dropzone/dist/dropzone.css';

// Otis Admin PRO React components
import MDBox from '@/components/MDBox';

// Custom styles for the MDDropzone
import MDDropzoneRoot from '@/components/MDDropzone/MDDropzoneRoot';

// Otis Admin PRO React context
import { useMaterialUIController } from 'context';

function MDDropzone({ options }) {
	const [controller] = useMaterialUIController();
	const { darkMode } = controller;

	const dropzoneRef = useRef();

	useEffect(() => {
		Dropzone.autoDiscover = false;

		function createDropzone() {
			return new Dropzone(dropzoneRef.current, { ...options });
		}

		function removeDropzone() {
			if (Dropzone.instances.length > 0) Dropzone.instances.forEach((dz) => dz.destroy());
		}

		createDropzone();

		return () => removeDropzone();
	}, [options]);

	return (
		<MDDropzoneRoot
			component="form"
			action="/file-upload"
			ref={dropzoneRef}
			className="form-control dropzone"
			ownerState={{ darkMode }}
		>
			<MDBox className="fallback" bgColor="transparent">
				<MDBox component="input" name="file" type="file" multiple />
			</MDBox>
		</MDDropzoneRoot>
	);
}

// Typechecking props for the MDDropzone
MDDropzone.propTypes = {
	options: PropTypes.instanceOf(Object).isRequired,
};

export default MDDropzone;
