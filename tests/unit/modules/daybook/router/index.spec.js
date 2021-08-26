import daybookRouter from '@/modules/daybook/router';

describe('Router - Daybook', () => {
  test('debe de leer cambios en la configuracion configuracion ', () => {
    expect(daybookRouter).toMatchObject({
      name: 'daybook',
      component: expect.any(Function),
      children: [
        {
          path: '',
          name: 'no-entry',
          component: expect.any(Function),
        },
        {
          path: ':id',
          name: 'entry',
          component: expect.any(Function),
          props: expect.any(Function),
        },
      ],
    });
  });
  test('debe comprobar que los componentes carguen en las rutas esperadas', async () => {
    const promisesRoutes = [];
    daybookRouter.children.forEach((child) => promisesRoutes.push(child.component()));

    const nameRoutes = (await Promise.all(promisesRoutes)).map((r) => r.default.name);

    expect(nameRoutes).toContain('NoEntrySelected');
    expect(nameRoutes).toContain('EntryView');
  });
  test('debe de retornar el id de la ruta', () => {
    const routeToTest = {
      name: 'entry',
      params: {
        id: 'ABC-123',
      },
    };

    const entryRoute = daybookRouter.children.find((route) => route.name === routeToTest.name);
    expect(entryRoute.props(routeToTest)).toEqual({ id: 'ABC-123' });
  });
});
