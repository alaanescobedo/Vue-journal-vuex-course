import HomeView from '@/views/Home';
import { shallowMount } from '@vue/test-utils';

describe('About View', () => {
  const wrapper = shallowMount(HomeView);
  test('Debe renderizar el componente correctamente', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Al hacer click el boton debe de redireccionar a no-entry', () => {
    const mockRouter = {
      push: jest.fn(),
    };

    const wrapper = shallowMount(HomeView, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });

    wrapper.find('button').trigger('click');

    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' });
  });
});
