import HomeView from '@/views/Home';
import { shallowMount } from '@vue/test-utils';

describe('Home View', () => {
  let wrapper;
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    wrapper = shallowMount(HomeView, {
      global: {
        mocks: {
          $router: mockRouter,
        },
      },
    });
  });

  test('Debe renderizar el componente correctamente', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  test('Al hacer click el boton debe de redireccionar a no-entry', () => {
    wrapper.find('button').trigger('click');

    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'login' });
  });
  test('Al hacer click el boton debe de redireccionar al login', () => {
    const buttons = wrapper.findAll('button');
    buttons[1].trigger('click');

    expect(mockRouter.push).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith({ name: 'no-entry' });
  });
});
