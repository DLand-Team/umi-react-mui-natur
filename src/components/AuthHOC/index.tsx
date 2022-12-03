import React, { Component } from 'react';
import copyStatic from 'hoist-non-react-statics';
import type { StoreType } from '@@/plugin-natur';
import { inject } from 'umi'

type AuthProps = {
	auth?: string;
};

type Ref = {
	forwardRef?: any,
}

type UserStoreModule = Pick<StoreType, 'user'>;

type AuthHOCProps<T> = T & AuthProps & Ref & UserStoreModule;

/**
 * 创建权限过滤器高阶组件
 * 控制需要权限验证模块的权限验证，
 * 如果用户有权限就显示该模块，
 * 没有就不显示。
 * @param {React.ComponentClass<T> | React.FC<T>} WrappedComponent 需要控制权限的组件
 * @returns {Component} 封装后的组件，可以通过权限属性控制组件显隐
 *
 */
function AuthHOC<T, U extends AuthHOCProps<T> = AuthHOCProps<T>>(WrappedComponent: React.ComponentClass<T> | React.FC<T>) {
	class AuthFilter extends Component<U> {
		render() {
			const { auth, forwardRef, user, ...props } = this.props;
			const authIsValid = user.maps.hasAuth(auth);
			
			if (forwardRef) {
				(props as any).ref = forwardRef;
			}
			if (authIsValid) {
				// @ts-ignore
				return <WrappedComponent {...(props as T)} />;
			}
			return null;
		}
	}
	let RefAuthFilter = AuthFilter;
	if (typeof (WrappedComponent as any).render === 'function') {
		RefAuthFilter = React.forwardRef((props, ref) => {
			const newProps: any = {
				...props,
				forwardRef: ref,
			};
			return <AuthFilter {...newProps} />;
		}) as any;
	}
	RefAuthFilter = copyStatic(RefAuthFilter, WrappedComponent);
	return inject(['user', {maps: ['hasAuth']}])(RefAuthFilter as React.ComponentClass<U>);
}

export default AuthHOC;
