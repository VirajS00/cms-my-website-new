import {
	Menu,
	MenuItem,
	Popover,
	PopoverButton,
	PopoverPanel,
	Transition,
} from "solid-headless";
import { Component, Resource } from "solid-js";
import { createServerAction$ } from "solid-start/server";
import { logout } from "~/db/session";
import { UserReturnType } from "~/types/user-return-type";

export const Header: Component<{
	user: Resource<UserReturnType | undefined>;
}> = ({ user }) => {
	const [, { Form }] = createServerAction$((_f: FormData, { request }) =>
		logout(request)
	);

	const nameLetters = `${user()?.first_name.charAt(
		0
	)}${user()?.last_name.charAt(0)}`;

	return (
		<header class='bg-gray-200 border-b border-b-gray-300 shadow flex py-3 items-center justify-between px-6'>
			<h1 class='text-xl font-bold text-slate-500 font-mono'>
				Viraj's Admin Dashbaord
			</h1>
			<div>
				<Popover defaultOpen={false} as='div' class='relative'>
					{({ isOpen }) => (
						<>
							<PopoverButton
								as='button'
								classList={{
									"rounded-full border border-blue-400 bg-blue-200 h-12 w-12":
										true,
									"border-blue-700": isOpen(),
								}}>
								{nameLetters}
							</PopoverButton>
							<Transition
								show={isOpen()}
								enter='transition duration-200'
								enterFrom='opacity-0 -translate-y-1 scale-50'
								enterTo='opacity-100 translate-y-0 scale-100'
								leave='transition duration-150'
								leaveFrom='opacity-100 translate-y-0 scale-100'
								leaveTo='opacity-0 -translate-y-1 scale-50'>
								<PopoverPanel
									unmount={false}
									class='absolute bg-white right-0 top-[calc(100%+0.3rem)] py-2 rounded border border-gray-300 shadow min-w-[150px]'>
									<Menu>
										<MenuItem as='div' class='w-full'>
											<Form>
												<button
													name='logout'
													type='submit'
													class='w-full px-6 py-2 text-left hover:bg-blue-100 hover:text-blue-600'>
													Logout
												</button>
											</Form>
										</MenuItem>
									</Menu>
								</PopoverPanel>
							</Transition>
						</>
					)}
				</Popover>
			</div>
		</header>
	);
};
