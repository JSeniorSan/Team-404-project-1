"""Add relationship between tasks and user

Revision ID: 8800aa96bb10
Revises: 6f0700651706
Create Date: 2023-10-29 21:05:07.411260

"""
from typing import Sequence, Union

from alembic import op
import fastapi_users_db_sqlalchemy
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8800aa96bb10'
down_revision: Union[str, None] = '6f0700651706'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('tasks', sa.Column('user_id', fastapi_users_db_sqlalchemy.generics.GUID(), nullable=False))
    op.create_foreign_key(None, 'tasks', 'user', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'tasks', type_='foreignkey')
    op.drop_column('tasks', 'user_id')
    # ### end Alembic commands ###