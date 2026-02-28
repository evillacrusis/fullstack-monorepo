import { z } from 'zod';
export declare const UuidSchema: z.ZodString;
export declare const EmailSchema: z.ZodString;
export declare const PasswordSchema: z.ZodString;
export declare const CreateUserSchema: z.ZodObject<
  {
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodEnum<['CLIENT', 'BARBER', 'ADMIN']>>;
  },
  'strip',
  z.ZodTypeAny,
  {
    name: string;
    email: string;
    password: string;
    role: 'CLIENT' | 'BARBER' | 'ADMIN';
  },
  {
    name: string;
    email: string;
    password: string;
    role?: 'CLIENT' | 'BARBER' | 'ADMIN' | undefined;
  }
>;
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export declare const UpdateUserSchema: z.ZodObject<
  Omit<
    {
      name: z.ZodOptional<z.ZodString>;
      email: z.ZodOptional<z.ZodString>;
      password: z.ZodOptional<z.ZodString>;
      role: z.ZodOptional<z.ZodDefault<z.ZodEnum<['CLIENT', 'BARBER', 'ADMIN']>>>;
    },
    'password'
  > & {
    id: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    id: string;
    name?: string | undefined;
    email?: string | undefined;
    role?: 'CLIENT' | 'BARBER' | 'ADMIN' | undefined;
  },
  {
    id: string;
    name?: string | undefined;
    email?: string | undefined;
    role?: 'CLIENT' | 'BARBER' | 'ADMIN' | undefined;
  }
>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export declare const UserResponseSchema: z.ZodObject<
  {
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<['CLIENT', 'BARBER', 'ADMIN']>;
    createdAt: z.ZodString;
    updatedAt: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    name: string;
    email: string;
    role: 'CLIENT' | 'BARBER' | 'ADMIN';
    id: string;
    createdAt: string;
    updatedAt: string;
  },
  {
    name: string;
    email: string;
    role: 'CLIENT' | 'BARBER' | 'ADMIN';
    id: string;
    createdAt: string;
    updatedAt: string;
  }
>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export declare const LoginSchema: z.ZodObject<
  {
    email: z.ZodString;
    password: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    email: string;
    password: string;
  },
  {
    email: string;
    password: string;
  }
>;
export type LoginDto = z.infer<typeof LoginSchema>;
export declare const AuthTokenSchema: z.ZodObject<
  {
    accessToken: z.ZodString;
    refreshToken: z.ZodOptional<z.ZodString>;
    expiresIn: z.ZodNumber;
  },
  'strip',
  z.ZodTypeAny,
  {
    accessToken: string;
    expiresIn: number;
    refreshToken?: string | undefined;
  },
  {
    accessToken: string;
    expiresIn: number;
    refreshToken?: string | undefined;
  }
>;
export type AuthToken = z.infer<typeof AuthTokenSchema>;
export declare const ApiSuccessSchema: <T extends z.ZodTypeAny>(
  dataSchema: T,
) => z.ZodObject<
  {
    success: z.ZodLiteral<true>;
    data: T;
    message: z.ZodOptional<z.ZodString>;
    timestamp: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  z.objectUtil.addQuestionMarks<
    z.baseObjectOutputType<{
      success: z.ZodLiteral<true>;
      data: T;
      message: z.ZodOptional<z.ZodString>;
      timestamp: z.ZodString;
    }>,
    any
  > extends infer T_1
    ? { [k in keyof T_1]: T_1[k] }
    : never,
  z.baseObjectInputType<{
    success: z.ZodLiteral<true>;
    data: T;
    message: z.ZodOptional<z.ZodString>;
    timestamp: z.ZodString;
  }> extends infer T_2
    ? { [k_1 in keyof T_2]: T_2[k_1] }
    : never
>;
export declare const ApiErrorSchema: z.ZodObject<
  {
    success: z.ZodLiteral<false>;
    error: z.ZodObject<
      {
        code: z.ZodString;
        message: z.ZodString;
        details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
      },
      'strip',
      z.ZodTypeAny,
      {
        code: string;
        message: string;
        details?: Record<string, unknown> | undefined;
      },
      {
        code: string;
        message: string;
        details?: Record<string, unknown> | undefined;
      }
    >;
    timestamp: z.ZodString;
  },
  'strip',
  z.ZodTypeAny,
  {
    success: false;
    error: {
      code: string;
      message: string;
      details?: Record<string, unknown> | undefined;
    };
    timestamp: string;
  },
  {
    success: false;
    error: {
      code: string;
      message: string;
      details?: Record<string, unknown> | undefined;
    };
    timestamp: string;
  }
>;
export type ApiError = z.infer<typeof ApiErrorSchema>;
export type ApiSuccess<T> = {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
};
export declare const PaginationQuerySchema: z.ZodObject<
  {
    page: z.ZodDefault<z.ZodNumber>;
    limit: z.ZodDefault<z.ZodNumber>;
    sortBy: z.ZodOptional<z.ZodString>;
    sortOrder: z.ZodDefault<z.ZodEnum<['asc', 'desc']>>;
  },
  'strip',
  z.ZodTypeAny,
  {
    page: number;
    limit: number;
    sortOrder: 'asc' | 'desc';
    sortBy?: string | undefined;
  },
  {
    page?: number | undefined;
    limit?: number | undefined;
    sortBy?: string | undefined;
    sortOrder?: 'asc' | 'desc' | undefined;
  }
>;
export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
export declare const PaginatedResponseSchema: <T extends z.ZodTypeAny>(
  itemSchema: T,
) => z.ZodObject<
  {
    items: z.ZodArray<T, 'many'>;
    meta: z.ZodObject<
      {
        totalItems: z.ZodNumber;
        totalPages: z.ZodNumber;
        currentPage: z.ZodNumber;
        itemsPerPage: z.ZodNumber;
      },
      'strip',
      z.ZodTypeAny,
      {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        itemsPerPage: number;
      },
      {
        totalItems: number;
        totalPages: number;
        currentPage: number;
        itemsPerPage: number;
      }
    >;
  },
  'strip',
  z.ZodTypeAny,
  {
    items: T['_output'][];
    meta: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      itemsPerPage: number;
    };
  },
  {
    items: T['_input'][];
    meta: {
      totalItems: number;
      totalPages: number;
      currentPage: number;
      itemsPerPage: number;
    };
  }
>;
//# sourceMappingURL=user.schema.d.ts.map
