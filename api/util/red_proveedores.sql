PGDMP         3            
    x            red_proveedores    13.0    13.0 a    .           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            /           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            0           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            1           1262    16394    red_proveedores    DATABASE     k   CREATE DATABASE red_proveedores WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE red_proveedores;
                postgres    false            �            1259    16397    administradores    TABLE     �   CREATE TABLE public.administradores (
    id integer NOT NULL,
    nombre character varying(60) NOT NULL,
    apellido character varying(60) NOT NULL,
    email character varying(30) NOT NULL,
    clave character varying(300) NOT NULL
);
 #   DROP TABLE public.administradores;
       public         heap    postgres    false            �            1259    16395    administradores_id_seq    SEQUENCE     �   CREATE SEQUENCE public.administradores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.administradores_id_seq;
       public          postgres    false    201            2           0    0    administradores_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.administradores_id_seq OWNED BY public.administradores.id;
          public          postgres    false    200            �            1259    16405 	   catalogos    TABLE     ^   CREATE TABLE public.catalogos (
    id integer NOT NULL,
    id_proveedor integer NOT NULL
);
    DROP TABLE public.catalogos;
       public         heap    postgres    false            �            1259    16403    catalogos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.catalogos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.catalogos_id_seq;
       public          postgres    false    203            3           0    0    catalogos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.catalogos_id_seq OWNED BY public.catalogos.id;
          public          postgres    false    202            �            1259    16413 
   categorias    TABLE     g   CREATE TABLE public.categorias (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL
);
    DROP TABLE public.categorias;
       public         heap    postgres    false            �            1259    16411    categorias_id_seq    SEQUENCE     �   CREATE SEQUENCE public.categorias_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.categorias_id_seq;
       public          postgres    false    205            4           0    0    categorias_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.categorias_id_seq OWNED BY public.categorias.id;
          public          postgres    false    204            �            1259    16419    categorias_productos    TABLE     r   CREATE TABLE public.categorias_productos (
    id_categoria integer NOT NULL,
    id_producto integer NOT NULL
);
 (   DROP TABLE public.categorias_productos;
       public         heap    postgres    false            �            1259    16422    categorias_proveedores    TABLE     u   CREATE TABLE public.categorias_proveedores (
    id_categoria integer NOT NULL,
    id_proveedor integer NOT NULL
);
 *   DROP TABLE public.categorias_proveedores;
       public         heap    postgres    false            �            1259    16427    estados_venta    TABLE     j   CREATE TABLE public.estados_venta (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL
);
 !   DROP TABLE public.estados_venta;
       public         heap    postgres    false            �            1259    16425    estados_venta_id_seq    SEQUENCE     �   CREATE SEQUENCE public.estados_venta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.estados_venta_id_seq;
       public          postgres    false    209            5           0    0    estados_venta_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.estados_venta_id_seq OWNED BY public.estados_venta.id;
          public          postgres    false    208            �            1259    16435    identificaciones    TABLE     m   CREATE TABLE public.identificaciones (
    id integer NOT NULL,
    nombre character varying(30) NOT NULL
);
 $   DROP TABLE public.identificaciones;
       public         heap    postgres    false            �            1259    16433    identificaciones_id_seq    SEQUENCE     �   CREATE SEQUENCE public.identificaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.identificaciones_id_seq;
       public          postgres    false    211            6           0    0    identificaciones_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.identificaciones_id_seq OWNED BY public.identificaciones.id;
          public          postgres    false    210            �            1259    16443 	   productos    TABLE     �   CREATE TABLE public.productos (
    id integer NOT NULL,
    nombre character varying(60) NOT NULL,
    precio integer NOT NULL,
    descripcion character varying(300) NOT NULL,
    id_catalogo integer NOT NULL
);
    DROP TABLE public.productos;
       public         heap    postgres    false            �            1259    16441    productos_id_seq    SEQUENCE     �   CREATE SEQUENCE public.productos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.productos_id_seq;
       public          postgres    false    213            7           0    0    productos_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.productos_id_seq OWNED BY public.productos.id;
          public          postgres    false    212            �            1259    16451    proveedores    TABLE     �  CREATE TABLE public.proveedores (
    id integer NOT NULL,
    identificacion integer NOT NULL,
    tipo_id integer NOT NULL,
    nombre character varying(60) NOT NULL,
    apellido character varying(60) NOT NULL,
    email character varying(60) NOT NULL,
    clave character varying(300) NOT NULL,
    contacto character varying(30) NOT NULL,
    direccion character varying(150) NOT NULL,
    descripcion character varying(300) NOT NULL
);
    DROP TABLE public.proveedores;
       public         heap    postgres    false            �            1259    16449    proveedores_id_seq    SEQUENCE     �   CREATE SEQUENCE public.proveedores_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.proveedores_id_seq;
       public          postgres    false    215            8           0    0    proveedores_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.proveedores_id_seq OWNED BY public.proveedores.id;
          public          postgres    false    214            �            1259    16462    resenas    TABLE     �   CREATE TABLE public.resenas (
    id integer NOT NULL,
    nivel_satisfaccion integer NOT NULL,
    comentario character varying(300) NOT NULL,
    id_venta integer NOT NULL
);
    DROP TABLE public.resenas;
       public         heap    postgres    false            �            1259    16460    resenas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.resenas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.resenas_id_seq;
       public          postgres    false    217            9           0    0    resenas_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.resenas_id_seq OWNED BY public.resenas.id;
          public          postgres    false    216            �            1259    16470    usuarios    TABLE       CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(60) NOT NULL,
    apellido character varying(60) NOT NULL,
    email character varying(40) NOT NULL,
    clave character varying(300) NOT NULL,
    contacto character varying(30) NOT NULL
);
    DROP TABLE public.usuarios;
       public         heap    postgres    false            �            1259    16468    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public          postgres    false    219            :           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public          postgres    false    218            �            1259    16485    ventas    TABLE     �   CREATE TABLE public.ventas (
    id integer NOT NULL,
    id_estado integer NOT NULL,
    id_proveedor integer NOT NULL,
    id_usuario integer NOT NULL,
    fecha date NOT NULL
);
    DROP TABLE public.ventas;
       public         heap    postgres    false            �            1259    16483    ventas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ventas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.ventas_id_seq;
       public          postgres    false    221            ;           0    0    ventas_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.ventas_id_seq OWNED BY public.ventas.id;
          public          postgres    false    220            a           2604    16400    administradores id    DEFAULT     x   ALTER TABLE ONLY public.administradores ALTER COLUMN id SET DEFAULT nextval('public.administradores_id_seq'::regclass);
 A   ALTER TABLE public.administradores ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    200    201            b           2604    16408    catalogos id    DEFAULT     l   ALTER TABLE ONLY public.catalogos ALTER COLUMN id SET DEFAULT nextval('public.catalogos_id_seq'::regclass);
 ;   ALTER TABLE public.catalogos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    203    202    203            c           2604    16416    categorias id    DEFAULT     n   ALTER TABLE ONLY public.categorias ALTER COLUMN id SET DEFAULT nextval('public.categorias_id_seq'::regclass);
 <   ALTER TABLE public.categorias ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    204    205    205            d           2604    16430    estados_venta id    DEFAULT     t   ALTER TABLE ONLY public.estados_venta ALTER COLUMN id SET DEFAULT nextval('public.estados_venta_id_seq'::regclass);
 ?   ALTER TABLE public.estados_venta ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    208    209    209            e           2604    16438    identificaciones id    DEFAULT     z   ALTER TABLE ONLY public.identificaciones ALTER COLUMN id SET DEFAULT nextval('public.identificaciones_id_seq'::regclass);
 B   ALTER TABLE public.identificaciones ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211            f           2604    16446    productos id    DEFAULT     l   ALTER TABLE ONLY public.productos ALTER COLUMN id SET DEFAULT nextval('public.productos_id_seq'::regclass);
 ;   ALTER TABLE public.productos ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212    213            g           2604    16454    proveedores id    DEFAULT     p   ALTER TABLE ONLY public.proveedores ALTER COLUMN id SET DEFAULT nextval('public.proveedores_id_seq'::regclass);
 =   ALTER TABLE public.proveedores ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    214    215            h           2604    16465 
   resenas id    DEFAULT     h   ALTER TABLE ONLY public.resenas ALTER COLUMN id SET DEFAULT nextval('public.resenas_id_seq'::regclass);
 9   ALTER TABLE public.resenas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    216    217            i           2604    16473    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    218    219            j           2604    16488 	   ventas id    DEFAULT     f   ALTER TABLE ONLY public.ventas ALTER COLUMN id SET DEFAULT nextval('public.ventas_id_seq'::regclass);
 8   ALTER TABLE public.ventas ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    221    221                      0    16397    administradores 
   TABLE DATA           M   COPY public.administradores (id, nombre, apellido, email, clave) FROM stdin;
    public          postgres    false    201   �p                 0    16405 	   catalogos 
   TABLE DATA           5   COPY public.catalogos (id, id_proveedor) FROM stdin;
    public          postgres    false    203   ,q                 0    16413 
   categorias 
   TABLE DATA           0   COPY public.categorias (id, nombre) FROM stdin;
    public          postgres    false    205   Mq                 0    16419    categorias_productos 
   TABLE DATA           I   COPY public.categorias_productos (id_categoria, id_producto) FROM stdin;
    public          postgres    false    206   rq                 0    16422    categorias_proveedores 
   TABLE DATA           L   COPY public.categorias_proveedores (id_categoria, id_proveedor) FROM stdin;
    public          postgres    false    207   �q                 0    16427    estados_venta 
   TABLE DATA           3   COPY public.estados_venta (id, nombre) FROM stdin;
    public          postgres    false    209   �q       !          0    16435    identificaciones 
   TABLE DATA           6   COPY public.identificaciones (id, nombre) FROM stdin;
    public          postgres    false    211   �q       #          0    16443 	   productos 
   TABLE DATA           Q   COPY public.productos (id, nombre, precio, descripcion, id_catalogo) FROM stdin;
    public          postgres    false    213   r       %          0    16451    proveedores 
   TABLE DATA           �   COPY public.proveedores (id, identificacion, tipo_id, nombre, apellido, email, clave, contacto, direccion, descripcion) FROM stdin;
    public          postgres    false    215   Nr       '          0    16462    resenas 
   TABLE DATA           O   COPY public.resenas (id, nivel_satisfaccion, comentario, id_venta) FROM stdin;
    public          postgres    false    217   �r       )          0    16470    usuarios 
   TABLE DATA           P   COPY public.usuarios (id, nombre, apellido, email, clave, contacto) FROM stdin;
    public          postgres    false    219   �r       +          0    16485    ventas 
   TABLE DATA           P   COPY public.ventas (id, id_estado, id_proveedor, id_usuario, fecha) FROM stdin;
    public          postgres    false    221   �s       <           0    0    administradores_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.administradores_id_seq', 2, true);
          public          postgres    false    200            =           0    0    catalogos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.catalogos_id_seq', 3, true);
          public          postgres    false    202            >           0    0    categorias_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.categorias_id_seq', 2, true);
          public          postgres    false    204            ?           0    0    estados_venta_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.estados_venta_id_seq', 2, true);
          public          postgres    false    208            @           0    0    identificaciones_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.identificaciones_id_seq', 5, true);
          public          postgres    false    210            A           0    0    productos_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.productos_id_seq', 3, true);
          public          postgres    false    212            B           0    0    proveedores_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.proveedores_id_seq', 4, true);
          public          postgres    false    214            C           0    0    resenas_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.resenas_id_seq', 1, false);
          public          postgres    false    216            D           0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 4, true);
          public          postgres    false    218            E           0    0    ventas_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.ventas_id_seq', 11, true);
          public          postgres    false    220            l           2606    16402 $   administradores administradores_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.administradores
    ADD CONSTRAINT administradores_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.administradores DROP CONSTRAINT administradores_pkey;
       public            postgres    false    201            n           2606    16410    catalogos catalogos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.catalogos
    ADD CONSTRAINT catalogos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.catalogos DROP CONSTRAINT catalogos_pkey;
       public            postgres    false    203            q           2606    16418    categorias categorias_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.categorias
    ADD CONSTRAINT categorias_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.categorias DROP CONSTRAINT categorias_pkey;
       public            postgres    false    205            s           2606    16498 .   categorias_productos categorias_productos_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.categorias_productos
    ADD CONSTRAINT categorias_productos_pkey PRIMARY KEY (id_categoria, id_producto);
 X   ALTER TABLE ONLY public.categorias_productos DROP CONSTRAINT categorias_productos_pkey;
       public            postgres    false    206    206            u           2606    16510 2   categorias_proveedores categorias_proveedores_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.categorias_proveedores
    ADD CONSTRAINT categorias_proveedores_pkey PRIMARY KEY (id_categoria, id_proveedor);
 \   ALTER TABLE ONLY public.categorias_proveedores DROP CONSTRAINT categorias_proveedores_pkey;
       public            postgres    false    207    207            y           2606    16432     estados_venta estados_venta_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.estados_venta
    ADD CONSTRAINT estados_venta_pkey PRIMARY KEY (id);
 J   ALTER TABLE ONLY public.estados_venta DROP CONSTRAINT estados_venta_pkey;
       public            postgres    false    209            {           2606    16440 &   identificaciones identificaciones_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.identificaciones
    ADD CONSTRAINT identificaciones_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.identificaciones DROP CONSTRAINT identificaciones_pkey;
       public            postgres    false    211            }           2606    16448    productos productos_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT productos_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.productos DROP CONSTRAINT productos_pkey;
       public            postgres    false    213                       2606    16459    proveedores proveedores_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT proveedores_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.proveedores DROP CONSTRAINT proveedores_pkey;
       public            postgres    false    215            �           2606    16467    resenas resenas_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.resenas
    ADD CONSTRAINT resenas_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.resenas DROP CONSTRAINT resenas_pkey;
       public            postgres    false    217            �           2606    16475    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public            postgres    false    219            �           2606    16490    ventas ventas_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT ventas_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.ventas DROP CONSTRAINT ventas_pkey;
       public            postgres    false    221            v           1259    16516    fki_id_categoria_fkey    INDEX     `   CREATE INDEX fki_id_categoria_fkey ON public.categorias_proveedores USING btree (id_categoria);
 )   DROP INDEX public.fki_id_categoria_fkey;
       public            postgres    false    207            �           1259    16548    fki_id_estado_fkey    INDEX     J   CREATE INDEX fki_id_estado_fkey ON public.ventas USING btree (id_estado);
 &   DROP INDEX public.fki_id_estado_fkey;
       public            postgres    false    221            o           1259    16496    fki_id_poveedor    INDEX     M   CREATE INDEX fki_id_poveedor ON public.catalogos USING btree (id_proveedor);
 #   DROP INDEX public.fki_id_poveedor;
       public            postgres    false    203            w           1259    16522    fki_id_proveedor_fkey    INDEX     `   CREATE INDEX fki_id_proveedor_fkey ON public.categorias_proveedores USING btree (id_proveedor);
 )   DROP INDEX public.fki_id_proveedor_fkey;
       public            postgres    false    207            �           1259    16586    fki_id_usuario_fkey    INDEX     L   CREATE INDEX fki_id_usuario_fkey ON public.ventas USING btree (id_usuario);
 '   DROP INDEX public.fki_id_usuario_fkey;
       public            postgres    false    221            �           2606    16533    productos id_catalogo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.productos
    ADD CONSTRAINT id_catalogo_fkey FOREIGN KEY (id) REFERENCES public.catalogos(id) ON UPDATE CASCADE;
 D   ALTER TABLE ONLY public.productos DROP CONSTRAINT id_catalogo_fkey;
       public          postgres    false    2926    203    213            �           2606    16499 &   categorias_productos id_categoria_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.categorias_productos
    ADD CONSTRAINT id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categorias(id) ON UPDATE CASCADE;
 P   ALTER TABLE ONLY public.categorias_productos DROP CONSTRAINT id_categoria_fkey;
       public          postgres    false    2929    206    205            �           2606    16523 (   categorias_proveedores id_categoria_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.categorias_proveedores
    ADD CONSTRAINT id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.categorias(id) ON UPDATE CASCADE;
 R   ALTER TABLE ONLY public.categorias_proveedores DROP CONSTRAINT id_categoria_fkey;
       public          postgres    false    207    205    2929            �           2606    16543    ventas id_estado_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT id_estado_fkey FOREIGN KEY (id_estado) REFERENCES public.estados_venta(id) ON UPDATE CASCADE;
 ?   ALTER TABLE ONLY public.ventas DROP CONSTRAINT id_estado_fkey;
       public          postgres    false    209    2937    221            �           2606    16504 %   categorias_productos id_producto_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.categorias_productos
    ADD CONSTRAINT id_producto_fkey FOREIGN KEY (id_producto) REFERENCES public.productos(id) ON UPDATE CASCADE;
 O   ALTER TABLE ONLY public.categorias_productos DROP CONSTRAINT id_producto_fkey;
       public          postgres    false    206    2941    213            �           2606    16491    catalogos id_proveedor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.catalogos
    ADD CONSTRAINT id_proveedor_fkey FOREIGN KEY (id_proveedor) REFERENCES public.proveedores(id) ON UPDATE CASCADE;
 E   ALTER TABLE ONLY public.catalogos DROP CONSTRAINT id_proveedor_fkey;
       public          postgres    false    2943    203    215            �           2606    16528 (   categorias_proveedores id_proveedor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.categorias_proveedores
    ADD CONSTRAINT id_proveedor_fkey FOREIGN KEY (id_proveedor) REFERENCES public.proveedores(id) ON UPDATE CASCADE;
 R   ALTER TABLE ONLY public.categorias_proveedores DROP CONSTRAINT id_proveedor_fkey;
       public          postgres    false    215    2943    207            �           2606    16571    ventas id_proveedor_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT id_proveedor_fkey FOREIGN KEY (id_proveedor) REFERENCES public.proveedores(id) ON UPDATE CASCADE NOT VALID;
 B   ALTER TABLE ONLY public.ventas DROP CONSTRAINT id_proveedor_fkey;
       public          postgres    false    2943    215    221            �           2606    16576    ventas id_proveedor_ventas_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT id_proveedor_ventas_fkey FOREIGN KEY (id_proveedor) REFERENCES public.proveedores(id) ON UPDATE CASCADE;
 I   ALTER TABLE ONLY public.ventas DROP CONSTRAINT id_proveedor_ventas_fkey;
       public          postgres    false    2943    215    221            �           2606    16581    ventas id_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.ventas
    ADD CONSTRAINT id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuarios(id) ON UPDATE CASCADE;
 @   ALTER TABLE ONLY public.ventas DROP CONSTRAINT id_usuario_fkey;
       public          postgres    false    221    2947    219            �           2606    16566    resenas id_venta_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.resenas
    ADD CONSTRAINT id_venta_fkey FOREIGN KEY (id_venta) REFERENCES public.ventas(id) ON UPDATE CASCADE;
 ?   ALTER TABLE ONLY public.resenas DROP CONSTRAINT id_venta_fkey;
       public          postgres    false    217    221    2951            �           2606    16538    proveedores tipo_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.proveedores
    ADD CONSTRAINT tipo_id_fkey FOREIGN KEY (id) REFERENCES public.identificaciones(id) ON UPDATE CASCADE;
 B   ALTER TABLE ONLY public.proveedores DROP CONSTRAINT tipo_id_fkey;
       public          postgres    false    2939    211    215               I   x�3�,.-H-�LL��̃���l��������\N#C#c�4#K�DS J471��4I4H5I�00LK6����� �J�            x�3�4����� �#            x�3����I4����� ��            x������ � �            x������ � �         '   x�3�t�S((�ON-��2�t��K�ɬJL������ �%	      !   &   x�3�tv�2�tv�2���2�r�2�p����� M��      #   %   x�3��IM�H�4200�0RR��9��b���� ��e      %   s   x��1
�0 �Y~E^dK����Ю]G�����c��H�Q"��]��íA�w?N�m.~��\ʆf*�q)\�5.r�a�1���Y��1��_��Ǵ[�|T뗅�B�:"�      '      x������ � �      )   �   x�̱� E�z��,+�.��cae���f�H4�Ư�8����tl�ҹ��n�h�}�T��fJK�V	ц"�\H��h�����:=A�X_�~h�� ��ͥ���8��$s�	2�%�,{��c�,*       +   !   x�34�4�4�4�420��54�50����� 1'�     